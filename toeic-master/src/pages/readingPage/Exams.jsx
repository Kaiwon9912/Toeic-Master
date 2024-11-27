import React from "react";
import useFetch from "../../hooks/useFetch";
import Question from "../../components/Question";

const Exam = ({ examId }) => {
  // Sử dụng useFetch để lấy câu hỏi từ API
  const { data: questions, loading, error } = useFetch(
    `http://localhost:3000/api/exam/${examId}`
  );

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!questions || questions.length === 0) {
    return <div>No questions available for this exam.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Questions for Exam {examId}</h2>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Question
            key={question.QuestionID}
            data={question}
            questionNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Exam;
