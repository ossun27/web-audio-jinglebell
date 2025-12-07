export declare const audioCtx: AudioContext;
export declare const NOTES: {
    readonly C4: 261.63;
    readonly D4: 293.66;
    readonly E4: 329.63;
    readonly F4: 349.23;
    readonly G4: 392;
    readonly A4: 440;
    readonly B4: 493.88;
    readonly C5: 523.25;
};
export type NoteName = keyof typeof NOTES;
export type WaveType = OscillatorType;
/**
 * 単音を鳴らす
 */
export declare function playNote(freq: number, type: WaveType, duration?: number): void;
/**
 * ドレミファソラシドを再生
 */
export declare function playScale(type: WaveType, bpm?: number): Promise<void>;
/**
 * ジングルベル 1番フル（簡易 C メジャー版）
 */
export declare const JINGLE_FULL: readonly ["E4", "E4", "E4", "E4", "E4", "E4", "E4", "G4", "C4", "D4", "E4", "F4", "F4", "F4", "F4", "F4", "E4", "E4", "E4", "E4", "E4", "D4", "D4", "E4", "D4", "G4", "E4", "E4", "E4", "E4", "E4", "E4", "E4", "G4", "C4", "D4", "E4", "F4", "F4", "F4", "F4", "F4", "E4", "E4", "E4", "E4", "G4", "G4", "F4", "D4", "C4"];
/**
 * ジングルベル 1番を通しで再生
 */
export declare function playJingleBellsFull(type?: WaveType, bpm?: number): Promise<void>;
//# sourceMappingURL=audio.d.ts.map