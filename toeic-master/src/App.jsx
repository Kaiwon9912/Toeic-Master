import { useState } from 'react';

import './App.css';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/HomePage/Home';
import ListeningPage from './pages/listeningPages/ListeningPage';
import ReadingPage from './pages/readingPage/ReadingPage';
function App() {
  return (
    <Router>
    <Routes><Route path="/" element={<Home/>} /></Routes>
    <Routes><Route path="/listening" element={<ListeningPage/>} /></Routes>
    <Routes><Route path="/reading" element={<ReadingPage/>} /></Routes>
    <Routes><Route path="/test" element={<Home/>} /></Routes>
    <Routes><Route path="/login" element={<Home/>} /></Routes>
    <Routes><Route path="/lessons" element={<Home/>} /></Routes>
  </Router>
  );
}

export default App;
