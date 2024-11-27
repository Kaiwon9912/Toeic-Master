import React from "react";
import { useNavigate } from "react-router-dom";

function Exam({ exam }) {
  const navigate = useNavigate();

  const handleStartExam = () => {
    // Truyền thông tin bài thi qua state
    navigate(`/exam/${exam.ExamID}`, { state: { examData: exam } });
  };

  return (
    <div className="p-5 border rounded-lg shadow-md bg-blue-50 flex flex-col justify-between">
      <h3 className="font-bold text-lg text-blue-700">{exam.ExamName}</h3>
      <p className="text-gray-700 mb-4">{exam.Description}</p>
      <p className="mb-2"><b>Level:</b> {exam.Level}</p>
      <p className="mb-4"><b>Duration:</b> {exam.DurationInMinutes} minutes</p>
      <button
        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
        onClick={handleStartExam}
      >
        Bắt đầu làm
      </button>
    </div>
  );
}

export default Exam;
