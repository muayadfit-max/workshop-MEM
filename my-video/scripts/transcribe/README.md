# Voice-over transcription → `src/data/words.json`

All steps run locally and offline once the models are downloaded. huggingface.co is blocked
here, so both models come from the sherpa-onnx GitHub releases.

1. Download the models:
   - `sherpa-onnx-whisper-turbo` (Whisper large-v3-turbo) for the text.
   - `sherpa-onnx-omnilingual-asr-1600-languages-1B-ctc-int8-2025-11-12` (Meta Omnilingual
     CTC) for the timing.
2. Extract the audio: `ffmpeg -i public/assets/voiceover.mov -vn -ac 1 -ar 16000 vo16k.wav`.
3. Whisper produces the text. This model export has no per-word timestamps, and decoding
   stopped at "It keeps", so the tail was transcribed separately with `language=en`. The
   merged text is in `transcript.txt`.
4. `align.py vo16k.wav align_raw.json`: CTC Viterbi forced alignment of the transcript.
5. `refine.py` moves each CTC onset back to the preceding energy minimum, since CTC fires
   late. It then writes `words.json`.
6. Verification: each on-screen line was cut at its aligned times and re-transcribed with
   Whisper. «من» was moved by hand from 5.85 s to 5.76 s after that check.
