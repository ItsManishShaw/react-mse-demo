import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the React MSE Demo</h1>
      <Link to="/video">Go to Video Playback</Link>
      <Link to="/shaka">Go to Shaka Player</Link>
    </div>
  );
};

export default HomePage;
