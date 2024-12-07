import React, { useState } from "react";

const Question = ({ data, onAnswerUpdate }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Mảng đại diện thứ tự đáp án (A, B, C, D, ...)
  const answerLabels = ["A", "B", "C", "D", "E", "F"];

  const handleAnswerSelect = (index) => {
    const answerLabel = answerLabels[index]; // Lấy ký tự tương ứng (A, B, C, D)
    setSelectedAnswer(answerLabel); // Cập nhật đáp án đã chọn
    onAnswerUpdate(index); // Gửi chỉ số đáp án về ExamPage
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-md">
      {/* Nội dung câu hỏi */}
      <div className="mb-4">
        {data.content && (
          <p className="font-semibold text-lg mb-2">{data.content}</p>
        )}
        {data.questionText && (
          <p className="font-semibold text-lg mb-2">{data.questionText}</p>
        )}
        {data.image && (
          <img
            src={data.image}
            alt="Question Illustration"
            className="w-full h-auto my-4"
          />
        )}
        {data.audio && (
          <audio controls className="w-full my-4">
            <source src={data.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

      {/* Các đáp án */}
      <div className="space-y-2">
        {data.answers.map((answer, index) => (
          <button
            key={index}
            className={`w-full text-left p-2 border rounded-lg ${selectedAnswer === answerLabels[index]
              ? "bg-blue-300 text-white"
              : "bg-gray-100"
              } hover:bg-blue-100`}
            onClick={() => handleAnswerSelect(index)} // Truyền chỉ số đáp án
          >
            <span className="font-bold mr-2">{answerLabels[index]}.</span>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;