import React, { useEffect, useState } from 'react';
import Footer from '../../../components/Footer';
import axios from 'axios';
import Header from '../../../components/Header';
import './part2.css'; // Đảm bảo bạn đã import tệp CSS

function Part2() {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [completedQuestions, setCompletedQuestions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [showAnswers, setShowAnswers] = useState({});
    const [selectedLevel, setSelectedLevel] = useState(null);
    const questionsPerPage = 18;

    useEffect(() => {
        const fetchQuestions = async () => {
            const partID = 2; // Thay đổi giá trị này để lấy câu hỏi cho phần khác
            try {
                const response = await axios.get(`http://localhost:3000/api/questions/${partID}`);
                setQuestions(response.data); // Giả sử data là mảng câu hỏi
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu câu hỏi:', error);
            }
        };

        fetchQuestions();
    }, []);

    // Lọc các câu hỏi có ExamQuestion là false
    const filteredQuestions = selectedLevel === null
        ? questions.filter(question => question.ExamQuestion === false) // Chỉ giữ câu hỏi có ExamQuestion = false
        : questions.filter(question => question.Level === selectedLevel && question.ExamQuestion === false);

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
        setSelectedLevel(value ? Number(value) : null);
        setCurrentPage(1);
    };

    return (
        <>
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
                    <div key={question.QuestionID} className="question-card">
                        <div className="header">
                            <span>{`Question ${question.QuestionID}`}</span>
                            <audio id={`audio-${question.QuestionID}`} src={question.QuestionAudio} controls />
                        </div>
                        <p className='prompt'>
                            {selectedAnswers[question.QuestionID] ? question.QuestionText : "Pick your best answer"}
                        </p>
                        <div className="answers">
                            <label style={{ flex: 1, textAlign: 'center' }}>
                                <input
                                    type="radio"
                                    name={`question-${question.QuestionID}`}
                                    value="A"
                                    checked={selectedAnswers[question.QuestionID] === question.AnswerA}
                                    onChange={() => handleAnswerChange(question.QuestionID, question.AnswerA)}
                                    disabled={completedQuestions[question.QuestionID]}
                                />
                                {completedQuestions[question.QuestionID] && showAnswers[question.QuestionID] ? question.AnswerA : 'A'}
                            </label>
                            <label style={{ flex: 1, textAlign: 'center' }}>
                                <input
                                    type="radio"
                                    name={`question-${question.QuestionID}`}
                                    value="B"
                                    checked={selectedAnswers[question.QuestionID] === question.AnswerB}
                                    onChange={() => handleAnswerChange(question.QuestionID, question.AnswerB)}
                                    disabled={completedQuestions[question.QuestionID]}
                                />
                                {completedQuestions[question.QuestionID] && showAnswers[question.QuestionID] ? question.AnswerB : 'B'}
                            </label>
                            <label style={{ flex: 1, textAlign: 'center' }}>
                                <input
                                    type="radio"
                                    name={`question-${question.QuestionID}`}
                                    value="C"
                                    checked={selectedAnswers[question.QuestionID] === question.AnswerC}
                                    onChange={() => handleAnswerChange(question.QuestionID, question.AnswerC)}
                                    disabled={completedQuestions[question.QuestionID]}
                                />
                                {completedQuestions[question.QuestionID] && showAnswers[question.QuestionID] ? question.AnswerC : 'C'}
                            </label>
                            <label style={{ flex: 1, textAlign: 'center' }}>
                                <input
                                    type="radio"
                                    name={`question-${question.QuestionID}`}
                                    value="D"
                                    checked={selectedAnswers[question.QuestionID] === question.AnswerD}
                                    onChange={() => handleAnswerChange(question.QuestionID, question.AnswerD)}
                                    disabled={completedQuestions[question.QuestionID]}
                                />
                                {completedQuestions[question.QuestionID] && showAnswers[question.QuestionID] ? question.AnswerD : 'D'}
                            </label>
                        </div>
                        {completedQuestions[question.QuestionID] && (
                            <div style={{ marginTop: '20px' }}>
                                <button onClick={() => resetQuestion(question.QuestionID)} style={{ marginRight: '10px' }}>
                                    Reset
                                </button>
                                <button onClick={() => setShowAnswers((prev) => ({ ...prev, [question.QuestionID]: !prev[question.QuestionID] }))}>
                                    {showAnswers[question.QuestionID] ? 'Hide Answer' : 'Show Answer'}
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
        </>
    );
}

export default Part2;