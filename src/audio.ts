// src/audio.ts

const audioCtx = new AudioContext();

// C4〜C5 の音名と周波数（Hz）
const NOTES = {
  C4: 261.63, // ド
  D4: 293.66, // レ
  E4: 329.63, // ミ
  F4: 349.23, // ファ
  G4: 392.0,  // ソ
  A4: 440.0,  // ラ
  B4: 493.88, // シ
  C5: 523.25, // 高いド
} as const;

type NoteName = keyof typeof NOTES;
type NoteOrRest = NoteName | "REST";

type ScoreItem = {
  note: NoteOrRest;
  length: number;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * 単音を鳴らす
 */
function playNote(
  freq: number,
  type: OscillatorType,
  duration = 0.4,
) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  osc.start(now);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.stop(now + duration);
}

/**
 * ドレミファソラシドを鳴らす
 */
export async function playScale(
  type: OscillatorType,
  bpm = 100,
) {
  const beatMs = (60 / bpm) * 1000;
  const SCALE: NoteName[] = ["C4","D4","E4","F4","G4","A4","B4","C5"];

  for (const note of SCALE) {
    playNote(NOTES[note], type);
    await sleep(beatMs);
  }
}

/**
 * ジングルベル（1番）休符つきスコア
 * すべての音に “ドレミ” コメントを追加
 */
const JINGLE_SCORE: ScoreItem[] = [
  // 🎵 ジングルベル ジングルベル 鈴が鳴る
  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 1.0 }, // ミー

  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 1.0 }, // ミー

  { note: "E4", length: 0.5 }, // ミ
  { note: "G4", length: 0.5 }, // ソ
  { note: "C4", length: 0.5 }, // ド
  { note: "D4", length: 0.5 }, // レ
  { note: "E4", length: 2.0 }, // ミー

  { note: "F4", length: 0.5 },  // ファ
  { note: "F4", length: 0.5 },  // ファ
  { note: "F4", length: 0.75 }, // ファー
  { note: "F4", length: 0.25 }, // ファ（短いの）
  { note: "F4", length: 0.5 },  // ファ

  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 0.5 }, // ミ

  { note: "E4", length: 0.5 }, // ミ
  { note: "D4", length: 0.5 }, // レ
  { note: "D4", length: 0.5 }, // レ
  { note: "E4", length: 0.5 }, // ミ
  { note: "D4", length: 1.0 }, // レーー
  { note: "G4", length: 1.0 }, // ソーー

  // 休符（曲の間）
  { note: "REST", length: 0.1 }, // rest

  // 🎵 ジングル・オール・ザ・ウェイ！
  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 1.0 }, // ミーー

  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 1.0 }, // ミーー

  { note: "E4", length: 0.5 }, // ミ
  { note: "G4", length: 0.5 }, // ソ
  { note: "C4", length: 0.5 }, // ド
  { note: "D4", length: 0.5 }, // レ
  { note: "E4", length: 2.0 }, // ミーーーー

  { note: "F4", length: 0.5 },  // ファ
  { note: "F4", length: 0.5 },  // ファ
  { note: "F4", length: 0.75 }, // ファー
  { note: "F4", length: 0.25 }, // ファ（短く）
  { note: "F4", length: 0.5 },  // ファ

  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 0.5 }, // ミ
  { note: "E4", length: 0.5 }, // ミ

  { note: "G4", length: 0.5 }, // ソ
  { note: "G4", length: 0.5 }, // ソ
  { note: "F4", length: 0.5 }, // ファ
  { note: "D4", length: 0.5 }, // レ
  { note: "C4", length: 2.0 }, // ドーーーー
];

/**
 * ジングルベル演奏
 */
export async function playJingleBellsFull(
  type: OscillatorType,
  bpm = 140,
) {
  const baseBeatMs = (60 / bpm) * 1000;

  for (const item of JINGLE_SCORE) {
    const durationMs = baseBeatMs * item.length;

    if (item.note !== "REST") {
      playNote(NOTES[item.note], type, item.length);
    }
    await sleep(durationMs);
  }
}
