// src/components/VideoPlaybackPage.js
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import './VideoPlaybackPage.css';

const VideoPlaybackPage = () => {
  const [videoSrc, setVideoSrc] = useState(
    'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  );
  const [videoType, setVideoType] = useState('hls');

  const handleSrcChange = (e) => setVideoSrc(e.target.value);
  const handleTypeChange = (e) => setVideoType(e.target.value);

  return (
    <div className='container'>
      <h1>Video Playback</h1>
      <div className='row'>
        <label className='label'>
          Video URL:
          <input
            type='text'
            value={videoSrc}
            onChange={handleSrcChange}
            placeholder='Enter video URL'
          />
        </label>
        <label className='label'>
          Type:
          <select value={videoType} onChange={handleTypeChange}>
            <option value='hls'>HLS</option>
            <option value='dash'>DASH</option>
            <option value='shaka'>Shaka</option>
          </select>
        </label>
      </div>
      <VideoPlayer src={videoSrc} type={videoType} />
    </div>
  );
};

export default VideoPlaybackPage;
