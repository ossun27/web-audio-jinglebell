// src/main.ts

import { playScale, playJingleBellsFull } from "./audio.js";

/**
 * ドレミ（各波形）ボタンのイベント設定
 */
document.getElementById("btn-sine")?.addEventListener("click", () => {
  // 正弦波（sine）でドレミを演奏
  playScale("sine");
});

document.getElementById("btn-square")?.addEventListener("click", () => {
  // 矩形波（square）でドレミを演奏
  playScale("square");
});

document.getElementById("btn-saw")?.addEventListener("click", () => {
  // のこぎり波（sawtooth）でドレミを演奏
  playScale("sawtooth");
});

document.getElementById("btn-tri")?.addEventListener("click", () => {
  // 三角波（triangle）でドレミを演奏
  playScale("triangle");
});

// ジングルベル用の波形セレクトボックス
const waveSelect = document.getElementById("wave-select") as HTMLSelectElement | null;

/**
 * 「ジングルベル再生」ボタンに、選択中の波形で演奏する処理を紐づける。
 */
document.getElementById("btn-jingle")?.addEventListener("click", () => {
  const selectedWave = (waveSelect?.value ?? "triangle") as OscillatorType;
  // ここで実際の演奏ロジック（playJingleBellsFull）が呼ばれる。
  playJingleBellsFull(selectedWave, 140);
});