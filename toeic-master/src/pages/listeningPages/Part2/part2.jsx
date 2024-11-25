import React, { useState } from 'react';
import './part2.css'; // Đảm bảo bạn đã import tệp CSS
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const audioClips = [
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
    "https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3",
];

const questions = [
    {
        id: 1,
        audio: audioClips[0],
        questionText: "What is this person doing?",
        answers: [
            "A A person is reading a book.",
            "B A person is cooking.",
            "C A person is walking."
        ],
        correctAnswer: "A A person is reading a book.",
        level: 1
    },
    {
        id: 2,
        audio: audioClips[1],
        questionText: "What is this person doing?",
        answers: [
            "A A person is watching TV.",
            "B A person is talking.",
            "C A person is working."
        ],
        correctAnswer: "B A person is talking.",
        level: 1
    },
    {
        id: 3,
        audio: audioClips[2],
        questionText: "What is this person doing?",
        answers: [
            "A A person is running.",
            "B A person is sitting.",
            "C A person is sleeping."
        ],
        correctAnswer: "C A person is sleeping.",
        level: 1
    },
    ...Array.from({ length: 45 }, (_, index) => {
        const correctAnswerIndex = Math.floor(Math.random() * 3);
        const answers = [
            `A Answer ${index + 4} - 1.`,
            `B Answer ${index + 4} - 2.`,
            `C Answer ${index + 4} - 3.`
        ];
        return {
            id: index + 4,
            audio: audioClips[(index + 3) % audioClips.length],
            questionText: `What is this person doing in situation ${index + 4}?`,
            answers: answers,
            correctAnswer: answers[correctAnswerIndex],
            level: Math.floor(Math.random() * 5) + 1
        };
    })
];
function Part2() {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [completedQuestions, setCompletedQuestions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [showAnswers, setShowAnswers] = useState({});
    const [selectedLevel, setSelectedLevel] = useState(null); // Thay đổi giá trị mặc định
    const questionsPerPage = 18;

    const filteredQuestions = selectedLevel === null
        ? questions // Hiển thị tất cả câu hỏi nếu không có cấp độ nào được chọn
        : questions.filter(question => question.level === selectedLevel);

    const totalFilteredPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    const startIndex = (currentPage - 1) * questionsPerPage;
    const displayedQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage);

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
        setCompletedQuestions((prev) => ({ ...prev, [questionId]: true }));
    };

    const resetQuestion = (questionId) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: undefined }));
        setCompletedQuestions((prev) => ({ ...prev, [questionId]: false }));
        setShowAnswers((prev) => ({ ...prev, [questionId]: false }));
    };

    const handleNextPage = () => {
        if (currentPage < totalFilteredPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleLevelChange = (event) => {
        const value = event.target.value;
        setSelectedLevel(value ? Number(value) : null); // Cập nhật selectedLevel
        setCurrentPage(1); // Đặt lại về trang đầu khi thay đổi cấp độ
    };

    return (
        <>
            <Header />
            <div className="part2">
                <div className="header-container">
                    <div className="intro-box">
                        <h3>Introduction to the Task</h3>
                        <p>
                            <strong>Instructions:</strong> You will hear a question or statement and three answers spoken in English.
                            They will not be printed in the test and will only be said once.
                            Choose the best answer for the question or statement and select the letter (A), (B), or (C) for your answer.
                        </p>
                    </div>
                    <div className="filter">
                        <label htmlFor="level-select">Select Level:</label>
                        <select id="level-select" value={selectedLevel || ''} onChange={handleLevelChange}>
                            <option value="">All Levels</option>
                            <option value={1}>Level 1</option>
                            <option value={2}>Level 2</option>
                            <option value={3}>Level 3</option>
                            <option value={4}>Level 4</option>
                            <option value={5}>Level 5</option>
                        </select>
                    </div>
                </div>
                {displayedQuestions.map((question) => (
                    <div key={question.id} className="question-card">
                        <div className="header">
                            <span>{`Question ${question.id}`}</span>
                            <audio id={`audio-${question.id}`} src={question.audio} controls />
                        </div>
                        <p className='prompt'>
                            {selectedAnswers[question.id] ? question.questionText : "Pick your best answer"}
                        </p>
                        <div className="answers">
                            {question.answers.map((answer) => {
                                const isCorrect = answer === question.correctAnswer;
                                const isSelected = selectedAnswers[question.id] === answer;
                                const answerClass = completedQuestions[question.id]
                                    ? (isSelected ? (isCorrect ? 'correct' : 'incorrect') : (isCorrect ? 'correct' : ''))
                                    : '';

                                return (
                                    <label
                                        key={answer}
                                        style={{ flex: 1, textAlign: 'center' }}
                                        className={answerClass}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={answer}
                                            checked={isSelected}
                                            onChange={() => handleAnswerChange(question.id, answer)}
                                            disabled={completedQuestions[question.id]}
                                        />
                                        {completedQuestions[question.id] && showAnswers[question.id] ? answer : answer.charAt(0)}
                                    </label>
                                );
                            })}
                        </div>
                        {completedQuestions[question.id] && (
                            <div style={{ marginTop: '20px' }}>
                                <button onClick={() => resetQuestion(question.id)} style={{ marginRight: '10px' }}>
                                    Reset
                                </button>
                                <button onClick={() => setShowAnswers((prev) => ({ ...prev, [question.id]: !prev[question.id] }))}>
                                    {showAnswers[question.id] ? 'Hide Answer' : 'Show Answer'}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                <div className="pagination">
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                        First
                    </button>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>{`Page ${currentPage} / ${totalFilteredPages}`}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalFilteredPages}>
                        Next
                    </button>
                    <button onClick={() => setCurrentPage(totalFilteredPages)} disabled={currentPage === totalFilteredPages}>
                        Last
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Part2;