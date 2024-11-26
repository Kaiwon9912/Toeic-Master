
import { useState } from 'react';
import './App.css';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';

import ListeningPage from './pages/listeningPages/ListeningPage';
import Part from "./pages/listeningPages/Part"

import ReadingPage from './pages/readingPage/ReadingPage';


import LessonList from './pages/lessonsPages/LessonList';
import LessonDetail from "./pages/lessonsPages/LessonDetail"



import Topics from './pages/adminPage/topics';
import AdminHome from './pages/adminPage/adminHome';
import VocabularyA from './pages/adminPage/vocabularyA';
import LessonA from './pages/adminPage/lessonA';
import ExamsA from './pages/adminPage/examsA';
import QuestionPart from './pages/readingPage/QuestionPart';

import Reading from './pages/lessonsPages/Reading';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/listening" element={<ListeningPage />} />
        <Route path="/listening/:part" element={<Part />} />

        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/reading/part/:part" element={<QuestionPart />} />

        <Route path="/test" element={<Home />} />

        <Route path="/lessons" element={<LessonList />} />
        <Route path="/lessons/:id" element={<LessonDetail />} />

        <Route path="/Reading" element={<Reading />} /> {/* bs thử kh chạy link  */}
        <Route path="/login" element={<AdminHome />} />  {/* AdminHome cho login */}

        {/* Route cha cho Admin */}
        <Route path="/admin" element={<AdminHome />}>
          <Route path="topics" element={<Topics />} /> {/* Route cho Topics */}
          <Route path="vocabulary" element={<VocabularyA />} /> {/* Route cho Vocabulary */}
          <Route path="lesson" element={<LessonA />} /> {/* Route cho Lesson */}
          <Route path="exams" element={<ExamsA />} /> {/* Route cho Exams */}
        </Route>

        {/* Các route khác có thể thêm vào đây */}
      </Routes>
    </Router>
  );
}

export default App;
