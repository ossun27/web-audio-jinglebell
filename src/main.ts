// src/main.ts

// 音まわりの処理を audio.ts から読み込む
// ★ここがポイント：拡張子に .js を付ける
import { playScale, playJingleBellsFull } from "./audio.js";

// ドレミ（各波形）ボタン
document.getElementById("btn-sine")?.addEventListener("click", () => {
  playScale("sine");
});
document.getElementById("btn-square")?.addEventListener("click", () => {
  playScale("square");
});
document.getElementById("btn-saw")?.addEventListener("click", () => {
  playScale("sawtooth");
});
document.getElementById("btn-tri")?.addEventListener("click", () => {
  playScale("triangle");
});

// 波形セレクト
const waveSelect = document.getElementById("wave-select") as HTMLSelectElement | null;

// ジングルベルボタン
document.getElementById("btn-jingle")?.addEventListener("click", () => {
  const selectedWave = (waveSelect?.value ?? "triangle") as OscillatorType;
  playJingleBellsFull(selectedWave, 140);
});
