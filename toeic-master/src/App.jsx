import { useState } from 'react';
import './App.css';
import { UserProvider } from './hooks/UserContext';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './hooks/PrivateRoute';

import Home from './pages/HomePage/Home';

import ReadingPage from './pages/readingPage/ReadingPage';
import ReadingQuestion from './pages/readingPage/readingQuestion';

import LessonList from './pages/lessonsPages/LessonList';
import LessonDetail from './pages/lessonsPages/LessonDetail';

import ListeningPage from './pages/listeningPage/ListeningPage';
import ListeningQuestion from './pages/listeningPage/listeningQuestion';

import VocabularyPage from './pages/vocabulary/VocabularyPage';

import ExamList from './pages/examPage/ExamList';
import ExamPage from './pages/examPage/ExamPage';

import Login from './pages/Auth/Login';
import UserInfo from './pages/Auth/UserInfo';

import Topics from './pages/adminPage/topics';
import AdminHome from './pages/adminPage/adminHome';
import VocabularyA from './pages/adminPage/vocabularyA';
import LessonA from './pages/adminPage/lessonA';
import Parts from './pages/adminPage/parts';
import Account from './pages/adminPage/account';
import AdminInfo from './pages/adminPage/adminInfo';
import ExamControl from './AdminArea/pages/ExamControl';
import QuestionCRUD from './AdminArea/pages/QuestionCRUD';
import QuestionGroupCRUD from './AdminArea/pages/QuestionGroupCRUD';





function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/listening" element={<PrivateRoute element={<ListeningPage />} />} />
          <Route path="/listening/:part" element={<PrivateRoute element={<ListeningQuestion />} />} />

          <Route path="/reading" element={<PrivateRoute element={<ReadingPage />} />} />
          <Route path="/reading/part/:part" element={<PrivateRoute element={<ReadingQuestion />} />} />

          <Route path="/vocabulary" element={<VocabularyPage />} />

          <Route path="/lessons" element={<LessonList />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/user-info" element={<PrivateRoute element={<UserInfo />} />} />

          <Route path="/exam" element={<PrivateRoute element={<ExamList />} />} />
          <Route path="/exam/:examID" element={<PrivateRoute element={<ExamPage />} />} />

          <Route path="/admin" element={<PrivateRoute element={<AdminHome />} />}>
            <Route path="question" element={<PrivateRoute element={<QuestionCRUD />} />} />
            <Route path="group" element={<PrivateRoute element={<QuestionGroupCRUD />} />} />
            <Route path="topics" element={<PrivateRoute element={<Topics />} />} />
            <Route path="vocabulary" element={<PrivateRoute element={<VocabularyA />} />} />
            <Route path="lesson" element={<PrivateRoute element={<LessonA />} />} />
            <Route path="account" element={<PrivateRoute element={<Account />} />} />
            <Route path="exams" element={<PrivateRoute element={<ExamControl />} />} />
            <Route path="adminInfo" element={<PrivateRoute element={<AdminInfo />} />} />
            <Route path="part" element={<PrivateRoute element={<Parts />} />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;