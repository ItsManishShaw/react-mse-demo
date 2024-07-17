// src/components/VideoPlayer.js
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import dashjs from 'dashjs';

const VideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (type === 'hls' && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    } else if (type === 'dash') {
      console.log('dash.js running');
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, src, true);
    } else {
      videoRef.current.src = src;
    }
  }, [src, type]);

  return <video ref={videoRef} controls style={{ width: '100%' }} />;
};

export default VideoPlayer;
