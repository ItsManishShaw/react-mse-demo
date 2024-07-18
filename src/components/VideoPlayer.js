// src/components/VideoPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import dashjs from 'dashjs';
import shaka from 'shaka-player';
import 'shaka-player/dist/controls.css';
import './VideoPlayer.css';

const VideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seekPosition, setSeekPosition] = useState('');

  useEffect(() => {
    let hls;
    let dashPlayer;
    let shakaPlayer;

    const video = videoRef.current;

    if (type === 'hls' && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
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
      dashPlayer.initialize(video, src, true);
    } else if (type === 'shaka') {
      shakaPlayer = new shaka.Player(video);
      shakaPlayer.addEventListener('error', onError);
      shakaPlayer.load(src).catch(onError);
    } else {
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (dashPlayer) {
        dashPlayer.reset();
      }
      if (shakaPlayer) {
        shakaPlayer.destroy();
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
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0.25 && value <= 16.0) {
      setPlaybackRate(value);
      videoRef.current.playbackRate = value;
    } else if (e.target.value === '') {
      setPlaybackRate('');
    } else {
      alert('Playback rate must be between 0.25 and 16');
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

  function onError(error) {
    console.error('Error code', error.code, 'object', error);
  }

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%' }} />
      <div className='controls'>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <label>
          Playback rate:
          <input
            type='text'
            value={playbackRate}
            onChange={handlePlaybackRateChange}
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
          />
        </label>
        <button onClick={handleSeekTo}>Seek</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
