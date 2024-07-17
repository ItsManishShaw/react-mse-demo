// src/components/VideoPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import dashjs from 'dashjs';

const VideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seekPosition, setSeekPosition] = useState('');

  useEffect(() => {
    let hls;
    let dashPlayer;

    if (type === 'hls' && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error(
                'Fatal network error encountered, trying to recover'
              );
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Fatal media error encountered, trying to recover');
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (type === 'dash') {
      dashPlayer = dashjs.MediaPlayer().create();
      dashPlayer.initialize(videoRef.current, src, true);
    } else {
      videoRef.current.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (dashPlayer) {
        dashPlayer.reset();
      }
    };
  }, [src, type]);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  const handlePlaybackRateChange = (e) => {
    const value = e.target.value;
    if (value === '' || isFinite(parseFloat(value))) {
      setPlaybackRate(value);
      videoRef.current.playbackRate = parseFloat(value) || 1; // Use 1 if value is empty or not a number
    }
  };

  const handleSeek = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const handleSeekTo = () => {
    const position = parseFloat(seekPosition);
    if (isFinite(position)) {
      videoRef.current.currentTime = position;
    }
  };

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%' }} />
      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <label>
          Playback rate:
          <input
            type='text'
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            style={{ width: '50px', marginLeft: '5px' }}
          />
        </label>
        <button onClick={() => handleSeek(-10)}>-10s</button>
        <button onClick={() => handleSeek(10)}>+10s</button>
        <label>
          Seek to:
          <input
            type='number'
            value={seekPosition}
            onChange={(e) => setSeekPosition(e.target.value)}
            style={{ width: '50px', marginLeft: '5px' }}
          />
        </label>
        <button onClick={handleSeekTo}>Seek</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
