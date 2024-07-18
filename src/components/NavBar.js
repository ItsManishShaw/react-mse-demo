import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='nav-item'>
        Home
      </Link>
      <Link to='/video' className='nav-item'>
        Video Playback
      </Link>
    </nav>
  );
};

export default NavBar;
