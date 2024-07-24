import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/video" className="nav-item">
        Video Playback
      </Link>
      <Link to="/shaka" className="nav-item">
        {" "}
        Shaka Playback
      </Link>
    </nav>
  );
};

export default NavBar;
