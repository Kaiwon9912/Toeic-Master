import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Question from '../../components/Question';
import axios from 'axios';
import MessageComponent from './MessageComponent';
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

const RandomFact = ({ facts }) => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  return (
    <div className="p-4 bg-blue-100 rounded-lg mb-4">
      <p className="font-bold text-blue-900">Bạn có biết?</p>
      <p>{facts[randomIndex]}</p>
    </div>
  );
};

function QuestionPart() {
  const { part } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [content, setContent] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [answeredCount, setAnsweredCount] = useState(0); // Số câu hỏi đã trả lời

  const fetchQuestions = async () => {
    const partNumber = Number(part);
    if (partNumber) {
      if (partNumber === 6) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/questions/random-group/${partNumber}`
          );
          if (response.data.length > 0) {
            setContent(response.data[0].Content);
            setQuestions(response.data);
          }
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      } else if (partNumber === 5) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/questions/random/${partNumber}/0`
          );
          setQuestions([response.data]);
        } catch (error) {
          console.error('Error fetching question:', error);
        }
      }
    } else {
      console.error('Part is not a valid number:', part);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerUpdate = (isCorrect) => {
    setTotalCount((prev) => prev + 1);
    setAnsweredCount((prev) => prev + 1); // Tăng số câu hỏi đã trả lời
    setIsSelected(true);
    setHistory((prev) => [...prev, { correct: isCorrect }]); // Cập nhật lịch sử
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
    <Header/>
     <div className="w-auto md:w-[64rem] m-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 space-y-4">
        <Progress totalCount={totalCount} correctCount={correctCount} />
        <AnswerHistory history={history} />
        <RandomFact
          facts={[
            'Học từ sai lầm là cách nhanh nhất để cải thiện.',
            'Hãy thử đọc thật kỹ câu hỏi trước khi trả lời.',
            'Đừng bỏ qua các chi tiết nhỏ trong câu hỏi!',
          ]}
        />
      </div>

      <div className="col-span-2">
        {part === '6' && content && (
          <div className="mb-5">
            <div className="text-lg bg-yellow-100 p-5 rounded-lg h-96 overflow-scroll">
              <b>  Question: {totalCount +1} </b> <MessageComponent content={content} />
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
          <button
            className={`bg-green-400 p-2 rounded-xl text-white ${answeredCount === questions.length ? 'block' : 'hidden'}`} // Hiển thị nút khi tất cả câu hỏi đã được trả lời
            onClick={handleNext}
          >
            Câu tiếp theo
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default QuestionPart;
