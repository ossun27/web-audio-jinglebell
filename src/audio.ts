// src/audio.ts
export const audioCtx = new AudioContext();

// 音名 → 周波数（前述）
export const NOTES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
} as const;

export type NoteName = keyof typeof NOTES;
export type WaveType = OscillatorType;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 単音を鳴らす関数
export function playNote(
  freq: number,
  type: WaveType,
  duration = 0.4,
) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  // すぐ鳴らして、なめらかにフェードアウト
  osc.start(now);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.stop(now + duration);
}

// ドレミファソラシドを順番に鳴らす
export async function playScale(
  type: WaveType,
  bpm = 120,
) {
  const beatMs = (60 / bpm) * 1000;
  const SCALE: NoteName[] = [
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
  ];

  for (const note of SCALE) {
    playNote(NOTES[note], type);
    await sleep(beatMs);
  }
}
