// src/audio.ts
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
export async function playScale(type, bpm = 100) {
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
 * ※中身は今貼ってもらったものをそのまま利用
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
    { note: "F4", length: 0.25 }, // ファ
    { note: "F4", length: 0.5 }, // ファ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "D4", length: 0.5 }, // レ
    { note: "D4", length: 0.5 }, // レ
    { note: "E4", length: 0.5 }, // ミ
    { note: "D4", length: 1 }, // レ──
    { note: "G4", length: 1 }, // ソ──
    // 1拍分の休符（今は 0.1 拍にしている）
    { note: "REST", length: 0.1 },
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
    { note: "G4", length: 0.5 },
    { note: "G4", length: 0.5 },
    { note: "F4", length: 0.5 },
    { note: "D4", length: 0.5 },
    { note: "C4", length: 2 },
];
/**
 * ジングルベル 1番を通しで再生（休符対応）
 */
export async function playJingleBellsFull(type, bpm = 140) {
    const baseBeatMs = (60 / bpm) * 1000;
    for (const item of JINGLE_SCORE) {
        const durationMs = baseBeatMs * item.length;
        if (item.note !== "REST") {
            // いまは length そのまま使う設定
            playNote(NOTES[item.note], type, item.length);
        }
        await sleep(durationMs);
    }
}
//# sourceMappingURL=audio.js.map