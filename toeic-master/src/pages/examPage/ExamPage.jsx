import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Footer from '../../components/Footer';
import Question from '../../components/Question';

function ExamPage() {
  const { state } = useLocation(); // Lấy state từ location
  const exam = state?.examData; // Kiểm tra xem có dữ liệu không
  console.log(exam?.Part5); // In ra số câu hỏi Part 5

  const [questions, setQuestions] = useState([]); // Câu hỏi sẽ được fetch từ API
  const [currentPart, setCurrentPart] = useState(1); // Part mặc định là Part 5
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Chỉ số câu hỏi hiện tại
  const [answers, setAnswers] = useState([]); // Mảng lưu trữ câu trả lời

  useEffect(() => {
    // Hàm xác định part hiện tại dựa trên số câu hỏi
    const getCurrentPart = () => {
      const totalQuestions = exam.Part1 + exam.Part2 + exam.Part3 + exam.Part4 + exam.Part5 + exam.Part6 + exam.Part7;
      const currentIndex = currentQuestionIndex;

      if (currentIndex < exam.Part1) {
        return 1;
      } else if (currentIndex < exam.Part1 + exam.Part2) {
        return 2;
      } else if (currentIndex < exam.Part1 + exam.Part2 + exam.Part3) {
        return 3;
      } else if (currentIndex < exam.Part1 + exam.Part2 + exam.Part3 + exam.Part4) {
        return 4;
      } else if (currentIndex < exam.Part1 + exam.Part2 + exam.Part3 + exam.Part4 + exam.Part5) {
        return 5;
      } else if (currentIndex < exam.Part1 + exam.Part2 + exam.Part3 + exam.Part4 + exam.Part5 + exam.Part6) {
        return 6;
      } else {
        return 7;
      }
    };

    // Fetch câu hỏi khi exam data có sẵn
    if (exam) {
      const fetchQuestions = async () => {
        try {
          // Lấy câu hỏi từ API với số câu hỏi tùy thuộc vào part
          const response = await axios.get(`http://localhost:3000/api/questions/random/5/1`);
          setQuestions(response.data);  // Cập nhật danh sách câu hỏi
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

      fetchQuestions();
      setCurrentPart(getCurrentPart()); // Cập nhật currentPart khi fetch dữ liệu
    }
  }, [exam, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Chuyển sang câu hỏi tiếp theo
    } else {
      // Nếu đã đến câu hỏi cuối cùng
      console.log('Đã hết câu hỏi');
    }
  };

  const handleAnswerUpdate = (isCorrect) => {
    setAnswers(prevAnswers => [...prevAnswers, isCorrect]);
    console.log("Answers:", answers);
  };

  if (!exam) return <div>Loading...</div>;

  return (
    <>
      <div className="w-auto md:w-[64rem] m-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sidebar */}
        <div className="col-span-1 space-y-4">
          <div className="p-5 bg-gray-100 rounded-lg mb-4">
            <h4 className="font-bold">Thông tin đề thi</h4>
            <p><b>{exam.ExamName}</b></p>
            <p>{exam.Description}</p>
            <p><b>Level:</b> {exam.Level}</p>
            <p><b>Duration:</b> {exam.DurationInMinutes} minutes</p>
            <p><b>Number of Questions:</b> {exam.TotalQuestions}</p>
            <p><b>Part 1 Questions:</b> {exam.Part1}</p>
            <p><b>Part 2 Questions:</b> {exam.Part2}</p>
            <p><b>Part 3 Questions:</b> {exam.Part3}</p>
            <p><b>Part 4 Questions:</b> {exam.Part4}</p>
            <p><b>Part 5 Questions:</b> {exam.Part5}</p>
            <p><b>Part 6 Questions:</b> {exam.Part6}</p>
            <p><b>Part 7 Questions:</b> {exam.Part7}</p>
            {/* Thêm các thông tin khác nếu cần */}
          </div>
          {/* Hiển thị part hiện tại */}
          <div className="p-5 bg-blue-100 rounded-lg">
            <h4 className="font-bold">Part {currentPart} hiện tại</h4>
            <p>{exam.Description}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-2">
          <div className="mb-5">
            <div className="text-lg bg-yellow-100 p-5 rounded-lg">
              <b> Part {currentPart}: </b>
              {exam.Description}
            </div>
          </div>

          <div className="h-96 overflow-scroll py-5">
            {questions.length > 0 ? (
              <Question
                data={questions[currentQuestionIndex]}
                onAnswerUpdate={handleAnswerUpdate}
                key={currentQuestionIndex}
              />
            ) : (
              <div>Loading questions...</div>
            )}
          </div>

          {/* Nút chuyển sang câu hỏi tiếp theo */}
          {questions.length > 0 && (
            <div className="w-full flex justify-between mt-5">
              <button
                className="bg-blue-500 text-white p-2 rounded-xl"
                onClick={handleNextQuestion}
              >
                Câu hỏi tiếp theo
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExamPage;
