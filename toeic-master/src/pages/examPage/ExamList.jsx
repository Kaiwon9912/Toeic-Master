import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Exam from './components/Exam';
import ExamFilter from './components/ExamFilter';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
function ExamList() {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedParts, setSelectedParts] = useState([]);

  // Fetch dữ liệu Exam
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/exams/');
        setExams(response.data);
        setFilteredExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  // Xử lý lọc dữ liệu
  useEffect(() => {
    let filtered = exams;

    if (selectedLevel) {
      filtered = filtered.filter((exam) => exam.Level === Number(selectedLevel));
    }

    if (selectedParts.length > 0) {
      filtered = filtered.filter((exam) =>
        selectedParts.some(
          (part) =>
            (part === 1 && exam.Part1 > 0) ||
            (part === 2 && exam.Part2 > 0) ||
            (part === 3 && exam.Part3 > 0) ||
            (part === 4 && exam.Part4 > 0) ||
            (part === 5 && exam.Part5 > 0) ||
            (part === 6 && exam.Part6 > 0) ||
            (part === 7 && exam.Part7 > 0)
        )
      );
    }

    setFilteredExams(filtered);
  }, [selectedLevel, selectedParts, exams]);

  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (type, value) => {
    if (type === 'level') {
      setSelectedLevel(value);
    } else if (type === 'part') {
      setSelectedParts((prev) =>
        prev.includes(value) ? prev.filter((part) => part !== value) : [...prev, value]
      );
    }
  };

  return (
   <>
   <Header/>
   <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Danh sách bài thi</h1>
      
      {/* Layout 2 cột */}
      <div className="grid grid-cols-12 gap-6">
        {/* Cột trái: Bộ Lọc */}
        <div className="col-span-12 md:col-span-3">
          <ExamFilter
            levels={[1, 2, 3]} // Giả sử có 3 Level
            parts={[1, 2, 3, 4, 5, 6, 7]} // Các Part từ 1 đến 7
            selectedLevel={selectedLevel}
            selectedParts={selectedParts}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Cột phải: Danh sách Exam */}
        <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam, index) => (
            <Exam key={index} exam={exam} />
          ))}
        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
}

export default ExamList;
