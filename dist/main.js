var _a, _b, _c, _d, _e;
import { audioCtx, playScale, playJingleBellsFull, } from "./audio";
document.addEventListener("click", async () => {
    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
        console.log("AudioContext resumed");
    }
}, { once: true });
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
(_e = document.getElementById("btn-jingle")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    playJingleBellsFull("triangle", 140);
});
//# sourceMappingURL=main.js.map