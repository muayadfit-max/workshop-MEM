import numpy as np, json, sys, onnxruntime as ort, soundfile as sf
D="models/sherpa-onnx-omnilingual-asr-1600-languages-1B-ctc-int8-2025-11-12"
TEXT=open('transcript.txt',encoding='utf-8').read().split()
vocab={}
for l in open(f"{D}/tokens.txt",encoding='utf-8').read().split('\n'):
    if not l: continue
    if l.startswith(' '): vocab[' ']=int(l.split()[-1]); continue
    c,i=l.rsplit(' ',1); vocab[c]=int(i)
def logits(wav):
    a,sr=sf.read(wav,dtype='float32'); x=(a-a.mean())/(a.std()+1e-7)
    s=ort.InferenceSession(f"{D}/model.int8.onnx",providers=['CPUExecutionProvider'])
    lg=s.run(None,{'x':x[None,:]})[0][0]; lg=lg-lg.max(-1,keepdims=True)
    return lg-np.log(np.exp(lg).sum(-1,keepdims=True)), len(a)/sr
lp,dur=logits(sys.argv[1]); T=lp.shape[0]; fr=dur/T
# token sequence with word spans; separator = space token between words
seq=[];wspan=[]
for wi,w in enumerate(TEXT):
    if wi: seq.append(vocab[' '])
    st=len(seq)
    for c in w.lower():
        assert c in vocab, (w,c); seq.append(vocab[c])
    wspan.append((st,len(seq)))
B=0
# CTC Viterbi over extended labels
ext=[B]
for k in seq: ext+= [k,B]
S=len(ext); NEG=-1e9
dp=np.full((T,S),NEG); bp=np.zeros((T,S),dtype=np.int32)
dp[0,0]=lp[0,B]; dp[0,1]=lp[0,ext[1]]
for t in range(1,T):
    prev=dp[t-1]
    c0=prev; c1=np.concatenate([[NEG],prev[:-1]]); c2=np.concatenate([[NEG,NEG],prev[:-2]])
    allow2=np.array([s>=2 and ext[s]!=B and ext[s]!=ext[s-2] for s in range(S)])
    c2=np.where(allow2,c2,NEG)
    st=np.stack([c0,c1,c2]); a=st.argmax(0)
    dp[t]=st.max(0)+lp[t,ext]; bp[t]=a
s=S-1 if dp[T-1,S-1]>dp[T-1,S-2] else S-2
path=[0]*T
for t in range(T-1,-1,-1):
    path[t]=s; s-=bp[t,s]
# token index -> frames
tokframes={}
for t,s in enumerate(path):
    if s%2==1: tokframes.setdefault((s-1)//2,[]).append(t)
out=[]
for wi,(a,b) in enumerate(wspan):
    fs=[f for k in range(a,b) for f in tokframes.get(k,[])]
    st,en=min(fs),max(fs)+1
    conf=float(np.mean([lp[f,seq[k]] for k in range(a,b) for f in tokframes.get(k,[])]))
    out.append(dict(word=TEXT[wi],start=round(st*fr,3),end=round(en*fr,3),conf=round(conf,2)))
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
for o in out: print(f"{o['start']:6.2f} {o['end']:6.2f} {o['conf']:6.2f}  {o['word']}")
