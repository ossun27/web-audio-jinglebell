// src/main.ts
var _a, _b, _c, _d, _e;
// 音まわりの処理を audio.ts から読み込む
// ★ここがポイント：拡張子に .js を付ける
import { playScale, playJingleBellsFull } from "./audio.js";
// ドレミ（各波形）ボタン
(_a = document.getElementById("btn-sine")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    playScale("sine");
});
(_b = document.getElementById("btn-square")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    playScale("square");
});
(_c = document.getElementById("btn-saw")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    playScale("sawtooth");
});
(_d = document.getElementById("btn-tri")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    playScale("triangle");
});
// 波形セレクト
const waveSelect = document.getElementById("wave-select");
// ジングルベルボタン
(_e = document.getElementById("btn-jingle")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    var _a;
    const selectedWave = ((_a = waveSelect === null || waveSelect === void 0 ? void 0 : waveSelect.value) !== null && _a !== void 0 ? _a : "triangle");
    playJingleBellsFull(selectedWave, 140);
});
//# sourceMappingURL=main.js.map