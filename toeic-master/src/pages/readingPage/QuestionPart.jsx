import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "../../components/Question";

const ExamPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");  // State để lưu content của GroupQuestionID

  // Lấy thông tin bài thi từ state khi điều hướng
  const examData = location.state?.examData;

  // Nếu không có thông tin bài thi, chuyển về trang chủ
  useEffect(() => {
    if (!examData) {
      navigate("/");
    }
  }, [examData, navigate]);

  // Gọi API để lấy danh sách câu hỏi của bài thi và content nếu có GroupQuestionID
  useEffect(() => {
    if (examData) {
      const fetchQuestionsAndContent = async () => {
        try {
          setLoading(true);

          // Fetch câu hỏi của bài thi
          const questionResponse = await fetch(
            `http://localhost:3000/api/questions/exam/${examData.ExamID}`
          );
          const questionData = await questionResponse.json();
          setQuestions(questionData);

          // Kiểm tra nếu có GroupQuestionID và fetch Content của nó
          if (examData.GroupQuestionID) {
            const groupQuestionResponse = await fetch(
              `http://localhost:3000/api/questions/group-question/${examData.GroupQuestionID}`
            );
            const groupQuestionData = await groupQuestionResponse.json();
            setContent(groupQuestionData.content);  // Lưu content vào state
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching questions:", error);
          setLoading(false);
        }
      };

      fetchQuestionsAndContent();
    }
  }, [examData]);

  // Xử lý khi chọn đáp án
  const handleAnswerUpdate = (answer) => {
    const questionId = questions[currentQuestionIndex].id;

    // Cập nhật câu trả lời
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer, // Lưu đáp án đã chọn
    }));

    // Chuyển sang câu tiếp theo
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">{examData?.ExamName}</h2>
        <p className="mb-4">
          <b>Số câu đã làm:</b> {Object.keys(answers).length}/{questions.length}
        </p>
        <ul className="space-y-2">
          {questions.map((question, index) => (
            <li
              key={question.id}
              className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${
                currentQuestionIndex === index
                  ? "bg-blue-300 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
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
            {content && (
              <div className="content mb-8">
                <h2 className="text-2xl font-bold">Nội dung bài thi</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            )}
            {questions.length > 0 && (
              <Question
                data={questions[currentQuestionIndex]}
                onAnswerUpdate={handleAnswerUpdate}
              />
            )}
          </>
        )}

        {/* Hiển thị tổng kết */}
        {currentQuestionIndex === questions.length - 1 && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold">Bạn đã hoàn thành bài thi!</p>
            <p>
              Số câu trả lời đúng:{" "}
              {
                Object.values(answers).filter(
                  (answer, index) =>
                    answer === questions[index].CorrectAnswer
                ).length
              }{" "}
              / {questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
