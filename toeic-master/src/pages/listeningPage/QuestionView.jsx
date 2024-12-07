import React, { useState } from 'react';

const QuestionView = ({ question, onAnswerUpdate, onNext }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State để lưu câu trả lời đã chọn

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer); // Lưu câu trả lời đã chọn
    };

    const handleNext = () => {
        const isCorrect = selectedAnswer === question.CorrectAnswer; // Kiểm tra câu trả lời đúng
        onAnswerUpdate(isCorrect); // Gọi hàm cập nhật câu trả lời
        setSelectedAnswer(null); // Reset lại câu trả lời đã chọn
        onNext(); // Chuyển đến câu hỏi tiếp theo
    };

    return (
        <div className="p-5 bg-white shadow-lg rounded-lg mb-4">
            {question.QuestionImage && (
                <img
                    src={question.QuestionImage}
                    alt="Question visual"
                    className="mb-4 w-full h-64 object-contain rounded-xl shadow-lg" // Điều chỉnh kiểu dáng hình ảnh
                />
            )}
            {question.QuestionAudio && (
                <audio controls className="w-full mb-4">
                    <source src={question.QuestionAudio} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                </audio>
            )}
            <div>
                <h3 className="p-5 bg-blue-300 rounded-xl">{question.QuestionText}</h3>
                <ul className="mt-5 space-y-2 bg-white">
                    {question.AnswerA && question.AnswerA !== "NULL" && (
                        <li
                            onClick={() => handleAnswer('A')}
                            className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'A' ? (question.CorrectAnswer === 'A' ? 'bg-green-300' : 'bg-red-300') : ''}`}
                        >
                            {question.AnswerA}
                        </li>
                    )}
                    {question.AnswerB && question.AnswerB !== "NULL" && (
                        <li
                            onClick={() => handleAnswer('B')}
                            className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'B' ? (question.CorrectAnswer === 'B' ? 'bg-green-300' : 'bg-red-300') : ''}`}
                        >
                            {question.AnswerB}
                        </li>
                    )}
                    {question.AnswerC && question.AnswerC !== "NULL" && (
                        <li
                            onClick={() => handleAnswer('C')}
                            className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'C' ? (question.CorrectAnswer === 'C' ? 'bg-green-300' : 'bg-red-300') : ''}`}
                        >
                            {question.AnswerC}
                        </li>
                    )}
                    {question.AnswerD && question.AnswerD !== "NULL" && (
                        <li
                            onClick={() => handleAnswer('D')}
                            className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'D' ? (question.CorrectAnswer === 'D' ? 'bg-green-300' : 'bg-red-300') : ''}`}
                        >
                            {question.AnswerD}
                        </li>
                    )}
                </ul>
            </div>
            <button
                onClick={handleNext}
                className="mt-4 p-2 bg-green-400 text-white rounded"
            >
                Câu tiếp theo
            </button>
        </div>
    );
};

export default QuestionView;