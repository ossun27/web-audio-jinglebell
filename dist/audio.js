// src/audio.ts
/**
 * このアプリ全体で使い回す AudioContext。
 * Web Audio API の「オーディオ処理の世界」と思っておけば OK です。
 */
const audioCtx = new AudioContext();
/**
 * C4〜C5 の音名と周波数（Hz）の対応表。
 * musical な名前（C4, E4...）で扱えるようにするためのマップです。
 */
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
 * 単音を鳴らす関数。
 *
 * @param freq - 周波数（Hz）
 * @param type - 波形の種類（sine / square / sawtooth / triangle）
 * @param duration - 何秒間鳴らすか（秒単位）
 *
 */
function playNote(freq, type, duration = 0.4) {
    // 1. ノードを作成
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    // 2. 波形タイプと周波数を設定
    osc.type = type;
    osc.frequency.value = freq;
    // 3. 処理経路を構築：osc → gain → 出力
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    // 4. 現在時刻を基準に、音の開始・終了を予約
    const now = audioCtx.currentTime;
    osc.start(now); // すぐに鳴らし始める
    // 5. 音量カーブを設定（最初は1.0、そのあと指数的に 0 付近まで減衰）
    gain.gain.setValueAtTime(1, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    // duration 秒後に発振を停止
    osc.stop(now + duration);
}
/**
 * ドレミファソラシドを順番に鳴らす関数。
 *
 * @param type - 波形の種類
 * @param bpm  - テンポ。大きいほど速くなる。
 *
 */
export async function playScale(type, bpm = 100) {
    // 1. BPM → 1拍あたりの長さに変換（ミリ秒）
    const beatMs = (60 / bpm) * 1000;
    // 2. 下のド (C4) から高いド (C5) までのスケール
    const SCALE = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
    // 3. 1音ずつ鳴らし、毎回 1拍ぶん待つ
    for (const note of SCALE) {
        playNote(NOTES[note], type);
        await sleep(beatMs);
    }
}
/**
 * ジングルベル（1番）のスコア。
 *
 * - note: E4, F4 などの音名。REST のときは休符
 * - length: 拍の長さ。0.5 = 半拍, 1.0 = 1拍, 2.0 = 2拍 のイメージです
 */
const JINGLE_SCORE = [
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
    { note: "E4", length: 2.0 }, // ミーーー
    { note: "F4", length: 0.5 }, // ファ
    { note: "F4", length: 0.5 }, // ファ
    { note: "F4", length: 0.75 }, // ファー
    { note: "F4", length: 0.25 }, // ファ（短く）
    { note: "F4", length: 0.5 }, // ファ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "D4", length: 0.5 }, // レ
    { note: "D4", length: 0.5 }, // レ
    { note: "E4", length: 0.5 }, // ミ
    { note: "D4", length: 1.0 }, // レーー
    { note: "G4", length: 1.0 }, // ソーー
    // フレーズ間の小さな休符
    { note: "REST", length: 0.1 }, // rest（無音）
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
    { note: "E4", length: 2.0 }, // ミーーー
    { note: "F4", length: 0.5 }, // ファ
    { note: "F4", length: 0.5 }, // ファ
    { note: "F4", length: 0.75 }, // ファー
    { note: "F4", length: 0.25 }, // ファ（短く）
    { note: "F4", length: 0.5 }, // ファ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "E4", length: 0.5 }, // ミ
    { note: "G4", length: 0.5 }, // ソ
    { note: "G4", length: 0.5 }, // ソ
    { note: "F4", length: 0.5 }, // ファ
    { note: "D4", length: 0.5 }, // レ
    { note: "C4", length: 2.0 }, // ドーーー
];
/**
 * ジングルベルを演奏する関数
 */
export async function playJingleBellsFull(type, bpm = 140) {
    // 1拍の長さをミリ秒に変換
    const baseBeatMs = (60 / bpm) * 1000;
    for (const item of JINGLE_SCORE) {
        const durationMs = baseBeatMs * item.length;
        if (item.note !== "REST") {
            // length をそのまま duration に渡しているので、
            // 1拍ぶんの音を length 倍だけ伸ばして鳴らすイメージ。
            playNote(NOTES[item.note], type, item.length);
        }
        // 音を鳴らしている間（または休符の間）は待機する
        await sleep(durationMs);
    }
}
//# sourceMappingURL=audio.js.map