import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Question from '../../components/Question';
import PassageCovert from '../../components/PassageConvert';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Progress = ({ totalCount, correctCount }) => {
  return (
    <div className="p-5 w-full shadow-xl border rounded-lg mb-4">
      <h3 className="font-bold text-lg">Tiến trình</h3>
      <p>
        Đã trả lời <span className="font-bold">{totalCount}</span> câu hỏi, 
        trong đó <span className="text-green-500 font-bold">{correctCount}</span> câu đúng.
      </p>
    </div>
  );
};

const AnswerHistory = ({ history }) => {
  return (
    <div className="p-5 bg-gray-100 rounded-lg mb-4 h-96 overflow-scroll">
      <h4 className="font-bold">Lịch sử trả lời</h4>
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li
            key={index}
            className={`p-2 rounded-lg ${item.correct ? 'bg-green-300' : 'bg-red-300'}`}
          >
            Câu {index + 1}: {item.correct ? 'Đúng' : 'Sai'}
          </li>
        ))}
      </ul>
    </div>
  );
};

function ReadingQuestion() {
  const { part } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [content, setContent] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [difficulty, setDifficulty] = useState(1); // Thêm state cho mức độ khó

  const fetchQuestions = async () => {
    const partNumber = Number(part);
    if (partNumber) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/questions/random/${partNumber}/${difficulty}`
        );
        if (partNumber === 6 && response.data.length > 0) {
          setContent(response.data[0].Content);
          setQuestions(response.data);
        } else if (partNumber === 5) {
          setQuestions([response.data]);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    } else {
      console.error('Part is not a valid number:', part);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [difficulty]); // Fetch questions lại mỗi khi mức độ khó thay đổi

  const handleAnswerUpdate = (isCorrect) => {
    setTotalCount((prev) => prev + 1);
    setIsSelected(true);
    setHistory((prev) => [...prev, { correct: isCorrect }]);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsSelected(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
    fetchQuestions();
  };

  return (
    <>
      <Header />
      <div className="w-auto md:w-[64rem] m-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 space-y-4">
          <Progress totalCount={totalCount} correctCount={correctCount} />
          <div className="p-5 bg-gray-100 rounded-lg">
            <h4 className="font-bold mb-2">Chọn mức độ khó</h4>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="p-2 border rounded-lg"
            >
              <option value={1}>Dễ</option>
              <option value={2}>Trung bình</option>
              <option value={3}>Khó</option>
            </select>
          </div>
          <AnswerHistory history={history} />
          {/* Dropdown chọn mức độ khó */}
         
        </div>

        <div className="col-span-2">
          {part === '6' && content && (
            <div className="mb-5">
              <div className="text-lg bg-yellow-100 p-5 rounded-lg h-96 overflow-scroll">
                <b>Question: {totalCount + 1}</b> <PassageCovert content={content} />
              </div>
            </div>
          )}

          {part === '6' && (
            <div className="h-96 overflow-scroll py-5">
              {questions.map((question, index) => (
                <Question
                  onAnswerUpdate={handleAnswerUpdate}
                  data={question}
                  key={index}
                />
              ))}
            </div>
          )}

          {part === '5' && questions.length > 0 && (
            <Question
              onAnswerUpdate={handleAnswerUpdate}
              data={questions[0][0]}
            />
          )}

          <div className="w-full flex justify-between mt-5">
            <div
              className={`bg-green-400 p-2 rounded-xl text-white ${
                isSelected ? 'block' : 'hidden'
              }`}
              onClick={handleNext}
            >
              Câu tiếp theo
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReadingQuestion;
