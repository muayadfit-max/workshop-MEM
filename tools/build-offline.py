#!/usr/bin/env python3
"""Bundle index.html into a single self-contained file for offline use.

Fonts, libraries, the world-atlas topology and every image are embedded, so the
result opens from a USB stick with no network at all. Run this after any change
to index.html, otherwise the backup drifts from the live site:

    python3 tools/build-offline.py

Needs network (npm registry + Google Fonts) to fetch the pieces it embeds.
"""
import base64, io, json, os, re, subprocess, sys, tempfile, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, OUT = os.path.join(ROOT, 'index.html'), os.path.join(ROOT, 'workshop-canvas-offline.html')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
                    '(KHTML, like Gecko) Chrome/120.0 Safari/537.36'}
# npm copies of exactly what the page loads from unpkg; the SRI hashes in
# index.html are checked against them below.
PKGS = {'d3': '7.9.0', 'topojson-client': '3.1.0', 'qrcode-generator': '1.4.4', 'world-atlas': '2.0.2'}


def fetch(url, headers=None):
    return urllib.request.urlopen(urllib.request.Request(url, headers=headers or {})).read()


def vendor(tmp):
    """Download and unpack the npm tarballs into tmp; return the package dirs."""
    dirs = {}
    for name, ver in PKGS.items():
        subprocess.run(['npm', 'pack', f'{name}@{ver}', '--silent'], cwd=tmp, check=True,
                       stdout=subprocess.DEVNULL)
        tgz = next(f for f in os.listdir(tmp) if f.startswith(name) and f.endswith('.tgz'))
        subprocess.run(['tar', 'xzf', tgz], cwd=tmp, check=True)
        os.rename(os.path.join(tmp, 'package'), os.path.join(tmp, name))
        dirs[name] = os.path.join(tmp, name)
    return dirs


def inline_fonts(html):
    """Swap the Google Fonts <link>s for @font-face rules with embedded woff2.

    Only the latin subset is kept: the page's own text has no Arabic, Cyrillic
    or Vietnamese (the Arabic on the workshop cover lives inside the image).
    """
    link = re.search(r'<link rel="preconnect"[^>]*>\s*<link rel="preconnect"[^>]*crossorigin>'
                     r'\s*<link href="(https://fonts\.googleapis\.com[^"]+)"[^>]*>', html)
    css = fetch(link.group(1).replace('&amp;', '&'), UA).decode()
    faces, parts = [], re.split(r'/\*\s*([a-z-]+)\s*\*/', css)
    for i in range(1, len(parts), 2):
        if parts[i] != 'latin':
            continue
        block = parts[i + 1]
        woff2 = re.search(r'url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)', block).group(1)
        b64 = base64.b64encode(fetch(woff2)).decode()
        faces.append("@font-face{{font-family:'{}';font-style:{};font-weight:{};font-display:swap;"
                     "src:url(data:font/woff2;base64,{}) format('woff2')}}".format(
                         re.search(r"font-family:\s*'([^']+)'", block).group(1),
                         re.search(r'font-style:\s*(\w+)', block).group(1),
                         re.search(r'font-weight:\s*(\d+)', block).group(1), b64))
    return html.replace(link.group(0),
                        '<style>\n/* Google Fonts, latin subset, embedded for offline use */\n'
                        + '\n'.join(faces) + '\n</style>', 1)


def main():
    html = io.open(SRC, encoding='utf-8').read()
    before = len(html.encode())

    with tempfile.TemporaryDirectory() as tmp:
        d = vendor(tmp)

        # Libraries, verified byte-for-byte against the SRI hashes in index.html.
        import hashlib
        for pat, path, label in (
            (r'<script src="https://unpkg\.com/d3@[^"]*"[^>]*></script>',
             os.path.join(d['d3'], 'dist/d3.min.js'), 'd3 %s' % PKGS['d3']),
            (r'<script src="https://unpkg\.com/topojson-client@[^"]*"[^>]*></script>',
             os.path.join(d['topojson-client'], 'dist/topojson-client.min.js'),
             'topojson-client %s' % PKGS['topojson-client']),
            (r'<script src="https://unpkg\.com/qrcode-generator@[^"]*"></script>',
             os.path.join(d['qrcode-generator'], 'qrcode.js'),
             'qrcode-generator %s' % PKGS['qrcode-generator']),
        ):
            tag = re.search(pat, html).group(0)
            raw = open(path, 'rb').read()
            want = re.search(r'integrity="sha384-([^"]+)"', tag)
            if want:
                got = base64.b64encode(hashlib.sha384(raw).digest()).decode()
                if got != want.group(1):
                    sys.exit('SRI mismatch for %s — refusing to bundle a different build' % label)
            html = html.replace(tag, '<script>/* %s (bundled offline) */\n%s\n</script>'
                                % (label, raw.decode()), 1)

        # World atlas: embed the topology and short-circuit the network fetch.
        topo = json.load(open(os.path.join(d['world-atlas'], 'countries-110m.json')))
        html = html.replace(
            "const topo = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json');",
            'const topo = window.__WORLD_ATLAS__;', 1)
        html = html.replace('</head>', '<script>/* world-atlas %s countries-110m (bundled offline) */\n'
                            'window.__WORLD_ATLAS__=%s;</script>\n</head>'
                            % (PKGS['world-atlas'], json.dumps(topo, separators=(',', ':'))), 1)

    html = inline_fonts(html)

    for name in sorted(os.listdir(os.path.join(ROOT, 'assets'))):
        if not name.endswith('.webp'):
            continue
        ref = 'assets/' + name
        if ref not in html:
            continue
        uri = 'data:image/webp;base64,' + base64.b64encode(
            open(os.path.join(ROOT, 'assets', name), 'rb').read()).decode()
        print('  embedded %-28s (%d refs)' % (name, html.count(ref)))
        html = html.replace(ref, uri)

    html = html.replace('<title>', '<!-- OFFLINE BACKUP: fully self-contained. '
                                   'No network required. Rebuild with tools/build-offline.py -->\n<title>', 1)

    left = re.findall(r'(?:src|href)="(https?://[^"]+)"', html)
    io.open(OUT, 'w', encoding='utf-8').write(html)
    print('\n  index.html            %8.1f KB' % (before / 1024))
    print('  offline bundle        %8.1f KB' % (len(html.encode()) / 1024))
    print('  external resources:   none' if not left else
          '  remaining links (navigation only, fine offline):\n    ' + '\n    '.join(left))


if __name__ == '__main__':
    main()
