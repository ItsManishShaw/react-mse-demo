import React, { useRef, useEffect } from "react";
import shaka from "shaka-player/dist/shaka-player.ui.js";
import "shaka-player/dist/controls.css";

const ShakaPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const videoContainer = videoContainerRef.current;

    const player = new shaka.Player(video);
    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    const controls = ui.getControls();

    const controlsConfig = {
      controlPanelElements: ["play_pause", "fullscreen"],
    };

    ui.configure(controlsConfig);

    player.addEventListener("error", onError);

    async function loadVideo() {
      try {
        await player.load(src);
        console.log("The video has now been loaded!");
      } catch (e) {
        onError(e);
      }
    }

    loadVideo();

    return () => {
      ui.destroy();
      player.destroy();
    };
  }, [src]);

  function onError(error) {
    console.error("Error code", error.code, "object", error);
  }

  return (
    <div
      ref={videoContainerRef}
      className="video-container"
      style={{ width: "100%", height: "100%" }}
    >
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%" }}
        controls={false}
      ></video>
    </div>
  );
};

export default ShakaPlayer;
