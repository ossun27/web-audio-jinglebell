// src/main.ts
var _a, _b, _c, _d, _e;
import { playScale, playJingleBellsFull } from "./audio.js";
/**
 * ドレミ（各波形）ボタンのイベント設定
 */
(_a = document.getElementById("btn-sine")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    // 正弦波（sine）でドレミを演奏
    playScale("sine");
});
(_b = document.getElementById("btn-square")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    // 矩形波（square）でドレミを演奏
    playScale("square");
});
(_c = document.getElementById("btn-saw")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    // のこぎり波（sawtooth）でドレミを演奏
    playScale("sawtooth");
});
(_d = document.getElementById("btn-tri")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    // 三角波（triangle）でドレミを演奏
    playScale("triangle");
});
// ジングルベル用の波形セレクトボックス
const waveSelect = document.getElementById("wave-select");
/**
 * 「ジングルベル再生」ボタンに、選択中の波形で演奏する処理を紐づける。
 */
(_e = document.getElementById("btn-jingle")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    var _a;
    const selectedWave = ((_a = waveSelect === null || waveSelect === void 0 ? void 0 : waveSelect.value) !== null && _a !== void 0 ? _a : "triangle");
    // ここで実際の演奏ロジック（playJingleBellsFull）が呼ばれる。
    playJingleBellsFull(selectedWave, 140);
});
//# sourceMappingURL=main.js.map