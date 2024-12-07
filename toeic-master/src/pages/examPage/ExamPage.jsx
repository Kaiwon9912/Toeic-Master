import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "./components/Question";

const ExamPage = () => {
  const userID = 1;
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState();
  const [correctAnswers, setCorrectAnswers] = useState([]); // Thêm state để lưu trữ câu trả lời đúng

  const examData = location.state?.examData;

  const calculateTotalQuestions = (questions) => {
    return questions.reduce((total, question) => {
      if (question.type === "single") {
        return total + 1;
      } else if (question.type === "group") {
        return total + question.questions.length;
      }
      return total;
    }, 0);
  };

  const calculateCorrectAnswers = () => {
    return Object.keys(answers).reduce((correct, questionId) => {
      const question = questions.find((q) => q.questionID === questionId);
      if (question) {
        if (answers[questionId] === question.CorrectAnswer) {
          return correct + 1;
        }
      }
      return correct;
    }, 0);
  };


  const calculateScore = () => {
    const totalQuestions = calculateTotalQuestions(questions);
    const userAnswersArray = Object.keys(answers).map(id => answers[id]); // Chuyển đổi answers thành mảng
    const correctCount = correctAnswers.reduce((count, correctAnswer, index) => {
      return count + (correctAnswer === userAnswersArray[index] ? 1 : 0);
    }, 0);
    return Math.round((correctCount / totalQuestions) * 100);
  };

  const handleSubmitExam = () => {
    const score = calculateScore();
    alert(`Kết quả của bạn: ${score} điểm\nSố câu đúng: ${correctAnswers.filter((_, index) => correctAnswers[index] === answers[Object.keys(answers)[index]]).length}/${calculateTotalQuestions(questions)}`);

    navigate("/submit", { state: { answers } });
  };

  useEffect(() => {
    if (!examData) {
      navigate("/#/");
    }
  }, [examData, navigate]);

  useEffect(() => {
    if (examData) {
      const fetchQuestions = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3000/api/questions/exam/${examData.ExamID}`
          );
          const data = await response.json();
          setQuestions(data);

          // Lưu correctAnswers vào mảng
          const answersArray = data.map(question => question.correctAnswer);
          console.log(answersArray);
          setCorrectAnswers(answersArray);

          setLoading(false);
          setRemainingTime(data.DurationInMinutes * 60);
        } catch (error) {
          console.error("Error fetching questions:", error);
          setLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [examData]);

  useEffect(() => {
    if (remainingTime <= 0) {
      alert("Thời gian làm bài đã hết!");
      handleSubmitExam(); // Tự động nộp bài khi hết thời gian
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, navigate, answers]);




  const handleAnswerUpdate = (answerIndex, questionId) => {
    console.log(questionId, answerIndex);
    const answerMap = ["A", "B", "C", "D"]; // Ánh xạ từ index sang đáp án
    const mappedAnswer = answerMap[answerIndex]; // Lấy đáp án theo chỉ số
    console.log(questionId, mappedAnswer);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: questionId, // Lưu QuestionID và đáp án
    }));
  };



  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      scrollToTop();
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    if (currentQuestion.type === "single") {
      return (
        <Question

          data={currentQuestion}
          onAnswerUpdate={(answerIndex) =>
            handleAnswerUpdate(answerIndex, currentQuestionIndex)
          }
        />
      );
    } else if (currentQuestion.type === "group") {
      return (
        <div>
          <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
            <h3 className="text-lg font-semibold">Nội dung nhóm:</h3>
            <p>{currentQuestion.groupContent}</p>
          </div>
          {currentQuestion.questions.map((subQuestion) => (
            <Question
              key={currentQuestion.content}
              data={currentQuestion}
              onAnswerUpdate={(answerIndex) =>
                handleAnswerUpdate(answerIndex, currentQuestion.index)
              }
            />
          ))}
        </div>
      );
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">{examData?.ExamName}</h2>
        <p className="mb-4">
          <b>Số câu đã làm:</b> {Object.keys(answers).length}/{calculateTotalQuestions(questions)}
        </p>

        <p className="mb-4 text-red-500 font-semibold">
          <b>Thời gian còn lại:</b> {formatTime(remainingTime)}
        </p>
        <ul className="space-y-2">
          {questions.map((question, index) => (
            <li
              key={index}
              className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${currentQuestionIndex === index
                ? "bg-blue-300 text-white"
                : "bg-gray-200"
                }`}
              onClick={() => {
                setCurrentQuestionIndex(index);
                scrollToTop();
              }}
            >
              <span>Câu {index + 1}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="w-3/4 p-8">
        {loading ? (
          <p>Đang tải câu hỏi...</p>
        ) : (
          <>
            {renderQuestion()}
            <div className="mt-8 flex justify-between">
              <button
                className={`px-4 py-2 rounded ${currentQuestionIndex === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 rounded ${currentQuestionIndex === questions.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                disabled={currentQuestionIndex === questions.length - 1}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            {currentQuestionIndex === questions.length - 1 && (
              <div className="mt-4 text-center">
                <button
                  className="bg-red-500 text-white py-2 px-6 rounded"
                  onClick={() => {
                    if (window.confirm("Bạn chắc chắn muốn nộp bài?")) {
                      handleSubmitExam();
                    }
                  }}
                >
                  Nộp bài
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
