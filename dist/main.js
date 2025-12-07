// src/main.ts
var _a, _b, _c, _d, _e;
// ====== Web Audio のセットアップ ======
const audioCtx = new AudioContext();
// C4〜C5 の音名と周波数（Hz）
const NOTES = {
    C4: 261.63, // ド
    D4: 293.66, // レ
    E4: 329.63, // ミ
    F4: 349.23, // ファ
    G4: 392.0, // ソ
    A4: 440.0, // ラ
    B4: 493.88, // シ
    C5: 523.25, // 高いド
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/**
 * 単音を鳴らす
 */
function playNote(freq, type, duration = 0.4) {
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
 * ドレミファソラシドを順番に鳴らす
 */
async function playScale(type, bpm = 120) {
    const beatMs = (60 / bpm) * 1000;
    const SCALE = [
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
/**
 * ジングルベル 1番フル（簡易 C メジャー版）
 */
const JINGLE_FULL = [
    // ♪ ジングルベル ジングルベル 鈴が鳴る
    "E4", "E4", "E4", // ミ ミ ミ
    "E4", "E4", "E4", // ミ ミ ミ
    "E4", "G4", "C4", "D4", "E4", // ミ ソ ド レ ミ
    "F4", "F4", "F4", "F4", // ファ ファ ファ ファ
    "F4", "E4", "E4", "E4", "E4", // ファ ミ ミ ミ ミ
    "E4", "D4", "D4", "E4", "D4", // ミ レ レ ミ レ
    "G4", // ソ
    // ♪ ジングルオールザウェイ〜 のところ
    "E4", "E4", "E4", // ミ ミ ミ
    "E4", "E4", "E4", // ミ ミ ミ
    "E4", "G4", "C4", "D4", "E4", // ミ ソ ド レ ミ
    "F4", "F4", "F4", "F4", // ファ ファ ファ ファ
    "F4", "E4", "E4", "E4", "E4", // ファ ミ ミ ミ ミ
    "G4", "G4", "F4", "D4", "C4", // ソ ソ ファ レ ド
];
/**
 * ジングルベル 1番を通しで再生
 */
async function playJingleBellsFull(type = "triangle", bpm = 140) {
    const beatMs = (60 / bpm) * 1000;
    for (const note of JINGLE_FULL) {
        playNote(NOTES[note], type);
        await sleep(beatMs);
    }
}
// ====== DOM イベントの設定 ======
// 自動再生制限対策（初回クリックで resume）
document.addEventListener("click", async () => {
    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
        console.log("AudioContext resumed");
    }
}, { once: true });
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
// ジングルベルボタン
(_e = document.getElementById("btn-jingle")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    playJingleBellsFull("triangle", 140);
});
export {};
//# sourceMappingURL=main.js.map