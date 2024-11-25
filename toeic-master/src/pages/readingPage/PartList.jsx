import React, { useState } from "react";
import PartItem from "./PartItem";
import ExamList from "./ExamList";
import QuestionList from "./QuestionList";
import useFetch from "../../hooks/useFetch";

function PartList() {
  const { data: parts, loading, error } = useFetch("http://localhost:3000/api/parts");

  const [selectedPartId, setSelectedPartId] = useState(null); // ID Part được chọn
  const [selectedExamId, setSelectedExamId] = useState(null); // ID Exam được chọn

  // Hàm xử lý khi chọn Part
  const handlePartClick = (partId) => {
    setSelectedPartId(partId);
    setSelectedExamId(null); // Reset selectedExamId khi chọn Part mới
  };

  // Hàm xử lý khi chọn Exam
  const handleExamClick = (examId) => {
    setSelectedExamId(examId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      {/* Cột trái - Danh sách Part */}
      <div className="w-1/3 border-r h-screen overflow-y-auto">
        {parts.map((part) => (
          <PartItem
            key={part.PartID}
            id={part.PartID}
            title={part.Title}
            number={part.TotalQuestions}
            learned={part.CompletedQuestions}
            onClick={handlePartClick} // Truyền callback khi click vào Part
          />
        ))}
      </div>

      {/* Cột phải - Danh sách Exam và câu hỏi */}
      <div className="w-2/3 p-4">
        {selectedPartId ? (
          <>
            <ExamList partId={selectedPartId} onExamClick={handleExamClick} />
            {selectedExamId && <QuestionList examId={selectedExamId} />}
          </>
        ) : (
          <p className="text-center text-gray-500">Chọn một Part để xem danh sách Exam.</p>
        )}
      </div>
    </div>
  );
}

export default PartList;
