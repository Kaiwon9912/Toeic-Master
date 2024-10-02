import { useState } from 'react'
import Home from './pages/Home';
import './App.css'
import MainLayout from './layout/mainLayout'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import VocabularyPage from './pages/VocabularyPage';
import QuestionPage from './pages/QuestionPage';
import ReadingPage from './pages/ReadingPage';
function App() {


  return (
    <>
  <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home/>
            </MainLayout>
          }
        />
          <Route
          path="/vocabulary"
          element={
            <MainLayout>
            <VocabularyPage/>
            </MainLayout>
          }
        /> <Route
        path="/reading"
        element={
          <MainLayout>
          <ReadingPage/>
          </MainLayout>
        }
      />
     </Routes>
     
  </Router>
    </>
  )
}

export default App
