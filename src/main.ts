import {
    audioCtx,
    playScale,
    playJingleBellsFull,
  } from "./audio";
  
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
  
  document.getElementById("btn-jingle")?.addEventListener("click", () => {
    playJingleBellsFull("triangle", 140);
  });
  