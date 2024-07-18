import React from "react";
import ShakaPlayer from "./ShakaPlayer";

function ShakaPlayback() {
  const videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        //     alignItems: "center",
        //     height: "100vh",
      }}
    >
      <div style={{ width: "80%", height: "80%" }}>
        <h1>Shaka Player Demo</h1>
        <ShakaPlayer src={videoSrc} />
      </div>
    </div>
  );
}

export default ShakaPlayback;
