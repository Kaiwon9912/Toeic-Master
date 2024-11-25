import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import ListeningPage from './pages/listeningPages/ListeningPage';
import ReadingPage from './pages/readingPage/ReadingPage';
import Topics from './pages/adminPage/topics';
import AdminHome from './pages/adminPage/adminHome'; 
import VocabularyA from './pages/adminPage/vocabularyA'; 
import LessonA from './pages/adminPage/lessonA'; 
import ExamsA from './pages/adminPage/examsA';
import QuestionPart from './pages/readingPage/QuestionPart';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listening" element={<ListeningPage />} />
        <Route path="/reading" element={<ReadingPage/>} />
        <Route path="/reading/part/:part" element={<QuestionPart />} />
        <Route path="/test" element={<Home />} />
        <Route path="/lessons" element={<Home />} />
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
