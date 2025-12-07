// src/main.ts
import {
    audioCtx,
    playScale,
    playJingleBellsFull,
  } from "./audio";
  
  // Chrome の自動再生制限対策
  // 初回いずれかのクリック後に AudioContext を resume する
  document.addEventListener(
    "click",
    async () => {
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
        console.log("AudioContext resumed");
      }
    },
    { once: true },
  );
  
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
  
  // ジングルベルボタン
  document.getElementById("btn-jingle")?.addEventListener("click", () => {
    playJingleBellsFull("triangle", 140);
  });
  