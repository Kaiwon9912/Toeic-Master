import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Question from '../components/Question'; // Import component Question
import GroupQuestion from '../components/GroupQuestion'; // Import component GroupQuestion
import axios from 'axios';

function QuestionPart() {
  const { part } = useParams();
  const [questions, setQuestions] = useState([]);
  const [content, setContent] = useState("");
  const [correctCount, setCorrectCount] = useState(0); // Đếm số câu trả lời đúng
  const [totalCount, setTotalCount] = useState(0); // Đếm số câu hỏi đã làm

  useEffect(() => {
    const fetchQuestions = async () => {
      const partNumber = Number(part);
      if (partNumber) {
        if (partNumber === 6) {
          try {
            const response = await axios.get(`http://localhost:3000/api/random-group/${partNumber}`);
            if (response.data.length > 0) {
              setContent(response.data[0].Content);
              setQuestions(response.data);
            }
          } catch (error) {
            console.error("Error fetching questions:", error);
          }
        } else if (partNumber === 5) {
          try {
            const response = await axios.get(`http://localhost:3000/api/question/part/${partNumber}/random`);
            setQuestions([response.data]); // Lưu câu hỏi đơn lẻ cho part 5
          } catch (error) {
            console.error("Error fetching question:", error);
          }
        }
      } else {
        console.error("Part is not a valid number:", part);
      }
    };

    fetchQuestions();
  }, [part]);

  // Hàm cập nhật số câu trả lời đúng
  const handleAnswerUpdate = (isCorrect) => {
    setTotalCount(prevCount => prevCount + 1); // Tăng số câu hỏi đã làm
    if (isCorrect) {
      setCorrectCount(prevCount => prevCount + 1); // Tăng số câu trả lời đúng
    }
  };

  return (
    <div className="w-auto md:w-[64rem] m-auto mt-10 flex justify-between ">
            <div className="p-5 w-52 flex justify-between shadow-xl border h-32">
            <div className='font-bold'>
            <p >Số câu hỏi:</p>
            <p>Số câu đúng: </p>
            </div>
            <div>
            <p > {totalCount}</p>
            <p className='text-green-400'> {correctCount}</p>
            </div>
    
      </div>
        <div className='w-[48rem]'>
        {part === '6' && content && (
        <div className="mb-5">
          <h2 className="text-lg font-semibold">{content}</h2>
        </div>
      )}

      {part === '6' && <GroupQuestion questions={questions} />} 
      {part === '5' && questions.length > 0 && 
        <Question part={part} onAnswerUpdate={handleAnswerUpdate} />} 
      
        </div>
  
    </div>
  );
}

export default QuestionPart;
