// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import VideoPlaybackPage from './components/VideoPlaybackPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/video' element={<VideoPlaybackPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
