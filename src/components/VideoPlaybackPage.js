//
// src/components/VideoPlaybackPage.js
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

const VideoPlaybackPage = () => {
  const [videoSrc, setVideoSrc] = useState(
    'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  );
  const [videoType, setVideoType] = useState('hls');

  const handleSrcChange = (e) => setVideoSrc(e.target.value);
  const handleTypeChange = (e) => setVideoType(e.target.value);

  return (
    <div>
      <h1>Video Playback</h1>
      <label style={{ margin: '10px' }}>
        Video URL:
        <input type='text' value={videoSrc} onChange={handleSrcChange} />
      </label>

      <label style={{ margin: '10px' }}>
        Type:
        <select value={videoType} onChange={handleTypeChange}>
          <option value='hls'>HLS</option>
          <option value='dash'>DASH</option>
        </select>
      </label>
      <VideoPlayer src={videoSrc} type={videoType} />
    </div>
  );
};

export default VideoPlaybackPage;
