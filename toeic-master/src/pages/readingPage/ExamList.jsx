import React from "react";
import useFetch from "../../hooks/useFetch";

function ExamList({ partId, onExamClick }) {
  const { data: exams, loading, error } = useFetch(
    `http://localhost:3000/api/exams/${partId}`
  );

  if (loading) return <div>Loading exams...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold">Danh sách Exam của Part {partId}</h2>
      {exams.length > 0 ? (
        <ul className="mt-4">
          {exams.map((exam) => (
            <li
              key={exam.ExamID}
              className="mb-2 p-2 border-b cursor-pointer"
              onClick={() => onExamClick(exam.ExamID)} // Gọi hàm khi click vào Exam
            >
              <p>
                <strong>{exam.ExamName}</strong>
              </p>
              <p>Số câu hỏi: {exam.TotalQuestions}</p>
              <p>Thời gian: {exam.DurationInMinutes} phút</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có Exam nào trong Part này.</p>
      )}
    </div>
  );
}

export default ExamList;
