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
                    className="mb-4 w-full h-80 object-cover" // Giới hạn chiều cao và giữ tỷ lệ
                />
            )}
            {question.QuestionAudio && (
                <audio controls className="w-full">
                    <source src={question.QuestionAudio} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                </audio>
            )}
            <div className="mt-4">
                {question.AnswerA && question.AnswerA !== "NULL" && (
                    <button
                        onClick={() => handleAnswer('A')}
                        className={`block w-full p-2 rounded-full mb-2 ${selectedAnswer === 'A' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600'}`}
                    >
                        {question.AnswerA}
                    </button>
                )}
                {question.AnswerB && question.AnswerB !== "NULL" && (
                    <button
                        onClick={() => handleAnswer('B')}
                        className={`block w-full p-2 rounded-full mb-2 ${selectedAnswer === 'B' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600'}`}
                    >
                        {question.AnswerB}
                    </button>
                )}
                {question.AnswerC && question.AnswerC !== "NULL" && (
                    <button
                        onClick={() => handleAnswer('C')}
                        className={`block w-full p-2 rounded-full mb-2 ${selectedAnswer === 'C' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600'}`}
                    >
                        {question.AnswerC}
                    </button>
                )}
                {question.AnswerD && question.AnswerD !== "NULL" && (
                    <button
                        onClick={() => handleAnswer('D')}
                        className={`block w-full p-2 rounded-full mb-2 ${selectedAnswer === 'D' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600'}`}
                    >
                        {question.AnswerD}
                    </button>
                )}
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