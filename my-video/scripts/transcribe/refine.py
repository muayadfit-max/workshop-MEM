import json, numpy as np, soundfile as sf
W=json.load(open('align_raw.json')); a,sr=sf.read('vo16k.wav',dtype='float32')
hop=int(0.01*sr); win=int(0.02*sr)
t_axis=np.arange(0,len(a)-win,hop)/sr
rms=np.array([np.sqrt((a[i:i+win]**2).mean()) for i in range(0,len(a)-win,hop)])
db=20*np.log10(rms+1e-9)
def emin(lo,hi):
    m=(t_axis>=lo)&(t_axis<=hi); idx=np.where(m)[0]
    return float(t_axis[idx[db[idx].argmin()]]+0.01)
out=[]
for i,w in enumerate(W):
    lo=w['start']-0.16
    if i: lo=max(lo,W[i-1]['end']-0.02, out[-1]['start']+0.06)
    s=emin(lo,w['start']+0.02)
    out.append(dict(word=w['word'],start=round(s,2),ctc_start=w['start'],ctc_end=w['end'],conf=w['conf']))
for i,w in enumerate(out):
    nxt=out[i+1]['start'] if i+1<len(out) else len(a)/sr
    e=w['ctc_end']+0.10
    w['end']=round(nxt if nxt-e<0.20 else min(e,nxt),2)
words=[dict(i=i,word=w['word'],start=w['start'],end=w['end'],lang='en' if w['word'].isascii() else 'ar',conf=w['conf']) for i,w in enumerate(out)]
json.dump(dict(source='assets/voiceover.mov',duration=round(len(a)/sr,3),method='Whisper large-v3-turbo text (sherpa-onnx) + omnilingual-1B CTC forced alignment, onsets snapped to the preceding energy minimum',words=words),open('words.json','w'),ensure_ascii=False,indent=1)
for w in words: print(f"{w['start']:6.2f} {w['end']:6.2f}  {w['word']}")
