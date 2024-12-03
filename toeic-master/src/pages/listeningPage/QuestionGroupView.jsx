import React, { useState } from 'react';

const QuestionGroupView = ({ audio, questions, onAnswerUpdate, onNext }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({}); // State để lưu câu trả lời đã chọn

    const handleAnswer = (questionId, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answer, // Lưu câu trả lời đã chọn
        }));
    };

    const handleNext = () => {
        questions.forEach((question) => {
            const isCorrect = selectedAnswers[question.QuestionID] === question.CorrectAnswer;
            onAnswerUpdate(isCorrect); // Gọi hàm cập nhật câu trả lời
        });
        setSelectedAnswers({}); // Reset lại câu trả lời đã chọn
        onNext(); // Chuyển đến câu hỏi tiếp theo
    };

    return (
        <div className="p-5 bg-white shadow-lg rounded-lg mb-4">
            {/* Hiển thị âm thanh nhóm câu hỏi */}
            {audio && (
                <audio controls className="w-full mb-4">
                    <source src={audio} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                </audio>
            )}
            {questions.map((question) => (
                <div key={question.QuestionID} className="mb-4">
                    {question.QuestionImage && (
                        <img
                            src={question.QuestionImage}
                            alt="Question visual"
                            className="mb-4 w-full h-96 object-cover"
                        />
                    )}
                    <h3 className="font-normal text-lg">{question.QuestionText}</h3>
                    <div className="mt-4">
                        {question.AnswerA && question.AnswerA !== "NULL" && (
                            <button
                                onClick={() => handleAnswer(question.QuestionID, 'A')}
                                className={`block w-full p-2 rounded-full mb-2 ${selectedAnswers[question.QuestionID] === 'A' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600'}`}
                            >
                                {question.AnswerA}
                            </button>
                        )}
                        {question.AnswerB && question.AnswerB !== "NULL" && (
                            <button
                                onClick={() => handleAnswer(question.QuestionID, 'B')}
                                className={`block w-full p-2 rounded-full mb-2 ${selectedAnswers[question.QuestionID] === 'B' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600'}`}
                            >
                                {question.AnswerB}
                            </button>
                        )}
                        {question.AnswerC && question.AnswerC !== "NULL" && (
                            <button
                                onClick={() => handleAnswer(question.QuestionID, 'C')}
                                className={`block w-full p-2 rounded-full mb-2 ${selectedAnswers[question.QuestionID] === 'C' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600'}`}
                            >
                                {question.AnswerC}
                            </button>
                        )}
                        {question.AnswerD && question.AnswerD !== "NULL" && (
                            <button
                                onClick={() => handleAnswer(question.QuestionID, 'D')}
                                className={`block w-full p-2 rounded-full mb-2 ${selectedAnswers[question.QuestionID] === 'D' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600'}`}
                            >
                                {question.AnswerD}
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <button
                onClick={handleNext}
                className="mt-4 p-2 bg-green-400 text-white rounded"
            >
                Câu tiếp theo
            </button>
        </div>
    );
};

export default QuestionGroupView;