import { useState } from 'react';
import Home from './pages/Home';
import './App.css';
import MainLayout from './layout/mainLayout';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import VocabularyPage from './pages/VocabularyPage';

import QuestionPart from './pages/QuestionPart';
import ReadingPage from './pages/ReadingPage';
import LessonList from './pages/LessonList'; 
import LessonDetail from './pages/LessonDetail'; 
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/vocabulary"
            element={
              <MainLayout>
                <VocabularyPage />
              </MainLayout>
            }
          />
          <Route
            path="/reading"
            element={
              <MainLayout>
                <ReadingPage />
              </MainLayout>
            }
          />
          {/* Thêm route động cho từng part của QuestionPage */}
          <Route
            path="/reading/part/:part"
            element={
              <MainLayout>
                <QuestionPart />
              </MainLayout>
            }
          />
          {/* Route cho danh sách bài học */}
          <Route
            path="/lessons"
            element={
              <MainLayout>
                <LessonList />
              </MainLayout>
            }
          />
          {/* Route cho chi tiết bài học */}
          <Route
            path="/lessons/:id"
            element={
              <MainLayout>
                <LessonDetail />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
