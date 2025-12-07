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
 * 休符付きジングルベル 1番（簡易 C メジャー版）
 */
const JINGLE_SCORE = [
    // ♪ ジングルベル ジングルベル 鈴が鳴る
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 1 }, // ミ──
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 1 }, // ミ──
    { note: "E4", length: 0.5 }, // ミ
    { note: "G4", length: 0.5 }, // ソ
    { note: "C4", length: 0.5 }, // ド
    { note: "D4", length: 0.5 }, // レ
    { note: "E4", length: 2 }, // ミ────
    { note: "F4", length: 0.5 }, // ファ
    { note: "F4", length: 0.5 }, // ファ
    { note: "F4", length: 0.75 }, // ファー
    { note: "F4", length: 0.25 }, // （ちょっとだけ）
    { note: "F4", length: 0.5 }, // ファ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "D4", length: 0.5 }, // レ
    { note: "D4", length: 0.5 }, // レ
    { note: "E4", length: 0.5 }, // ミ
    { note: "D4", length: 1 }, // レ──
    { note: "G4", length: 1 }, // ソ──
    // 1拍分の休符
    { note: "REST", length: 1 },
    // ♪ ジングルオールザウェイ〜
    { note: "E4", length: 0.5 },
    { note: "E4", length: 0.5 },
    { note: "E4", length: 1 },
    { note: "E4", length: 0.5 },
    { note: "E4", length: 0.5 },
    { note: "E4", length: 1 },
    { note: "E4", length: 0.5 },
    { note: "G4", length: 0.5 },
    { note: "C4", length: 0.5 },
    { note: "D4", length: 0.5 },
    { note: "E4", length: 2 },
    { note: "F4", length: 0.5 },
    { note: "F4", length: 0.5 },
    { note: "F4", length: 0.75 },
    { note: "F4", length: 0.25 },
    { note: "F4", length: 0.5 },
    { note: "E4", length: 0.5 },
    { note: "E4", length: 0.5 },
    { note: "E4", length: 0.5 },
    { note: "E4", length: 0.5 },
    { note: "G4", length: 0.5 },
    { note: "G4", length: 0.5 },
    { note: "F4", length: 0.5 },
    { note: "D4", length: 0.5 },
    { note: "C4", length: 2 },
];
/**
 * ジングルベル 1番を通しで再生（休符対応）
 */
async function playJingleBellsFull(type = "triangle", bpm = 140) {
    const baseBeatMs = (60 / bpm) * 1000;
    for (const item of JINGLE_SCORE) {
        const durationMs = baseBeatMs * item.length;
        if (item.note !== "REST") {
            const toneDuration = item.length * 0.9;
            playNote(NOTES[item.note], type, toneDuration);
        }
        await sleep(durationMs);
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
// 波形セレクト
const waveSelect = document.getElementById("wave-select");
// ジングルベルボタン
(_e = document.getElementById("btn-jingle")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    var _a;
    const selectedWave = ((_a = waveSelect === null || waveSelect === void 0 ? void 0 : waveSelect.value) !== null && _a !== void 0 ? _a : "triangle");
    playJingleBellsFull(selectedWave, 140);
});
export {};
//# sourceMappingURL=main.js.map