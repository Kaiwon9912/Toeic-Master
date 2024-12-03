import { useState } from 'react';
import './App.css';
import { UserProvider } from './hooks/UserContext'; // Import UserProvider
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';

import ListeningPage from './pages/listeningPages/ListeningPage';

import ReadingPage from './pages/readingPage/ReadingPage';


import LessonList from './pages/lessonsPages/LessonList';
import LessonDetail from "./pages/lessonsPages/LessonDetail"
import Part from "./pages/listeningPages/Part"

import VocabularyPage from './pages/vocabulary/VocabularyPage';

import Login from './pages/Auth/Login';
import UserInfo from './pages/Auth/UserInfo';

import Topics from './pages/adminPage/topics';
import AdminHome from './pages/adminPage/adminHome';
import VocabularyA from './pages/adminPage/vocabularyA';
import LessonA from './pages/adminPage/lessonA';
import Account from './pages/adminPage/account';
import AdminInfo from './pages/adminPage/adminInfo';

import ExamControl from './AdminArea/pages/ExamControl';
import ExamList from './pages/examPage/ExamList';
import ExamPage from './pages/examPage/ExamPage';
import ReadingQuestion from './pages/readingPage/readingQuestion';
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/listening/:part" element={<Part />} />

          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/reading/part/:part" element={<ReadingQuestion />} />

          <Route path="/vocabulary" element={<VocabularyPage />} />

          <Route path="/exam" element={<ExamList />} />
          <Route path="/exam/:examID" element={<ExamPage />} />

          <Route path="/lessons" element={<LessonList />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/user-info" element={<UserInfo />} />

          <Route path="/admin" element={<AdminHome />}>
            <Route path="topics" element={<Topics />} /> {/* Route cho Topics */}
            <Route path="vocabulary" element={<VocabularyA />} /> {/* Route cho Vocabulary */}
            <Route path="lesson" element={<LessonA />} /> {/* Route cho Lesson */}
            <Route path="account" element={<Account />} /> {/* Route cho Exams */}
            <Route path="exams" element={<ExamControl />} /> {/* Route cho Exams */}
            <Route path="adminInfo" element={<AdminInfo />} /> {/* Route cho Exams */}
          </Route>

          {/* Các route khác có thể thêm vào đây */}
        </Routes>
      </Router>
    </UserProvider>

  );
}

export default App;
