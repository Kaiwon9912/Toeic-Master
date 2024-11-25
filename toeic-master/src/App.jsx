import { useState } from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/HomePage/Home';

import ListeningPage from './pages/listeningPages/ListeningPage';
import Part from "./pages/listeningPages/Part"

import ReadingPage from './pages/readingPage/ReadingPage';

import LessonList from './pages/lessonsPages/LessonList';
import LessonDetail from "./pages/lessonsPages/LessonDetail"




function App() {
  return (
    <Router>
      <Routes><Route path="/" element={<Home />} /></Routes>
      <Routes>
        <Route path="/listening" element={<ListeningPage />} />
        <Route path="/listening/:part" element={<Part />} />
      </Routes>
      <Routes><Route path="/reading" element={<ReadingPage />} /></Routes>
      <Routes><Route path="/test" element={<Home />} /></Routes>
      <Routes><Route path="/login" element={<Home />} /></Routes>
      <Routes>
        <Route path="/lessons" element={<LessonList />} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
