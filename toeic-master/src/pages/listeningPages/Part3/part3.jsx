import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './part3.css';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

function Part3() {
    const [questions, setQuestions] = useState([]);
    const [questionGroups, setQuestionGroups] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [completedQuestions, setCompletedQuestions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLevel, setSelectedLevel] = useState(null); // State for selected level
    const questionsPerPage = 2; // Display two question groups per page

    // Fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            const partID = 3; // Thay đổi giá trị này để lấy câu hỏi cho phần khác
            try {
                const response = await axios.get(`http://localhost:3000/api/questions/${partID}`);
                setQuestions(response.data); // Giả sử data là mảng câu hỏi
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu câu hỏi:', error);
            }
        };

        const fetchQuestionGroups = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/question-groups`);
                setQuestionGroups(response.data); // Giả sử data là mảng nhóm câu hỏi
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu question groups:', error);
            }
        };

        fetchQuestions();
        fetchQuestionGroups();
    }, []); // Chỉ chạy một lần khi component mount

    // Combine questions with their groups
    const combinedQuestions = questions.map(question => {
        const group = questionGroups.find(group => group.QuestionGroupID === question.QuestionGroupID);
        return {
            ...question,
            groupAudio: group ? group.Audio : '',
            groupContent: group ? group.Content : '',
        };
    });

    // Filter combined questions to only include those with ExamQuestion = true
    const filteredQuestions = combinedQuestions.filter(question => question.ExamQuestion === false);

    // Group questions by groupID
    const groupedQuestions = filteredQuestions.reduce((groups, question) => {
        const group = groups[question.QuestionGroupID] || [];
        group.push(question);
        groups[question.QuestionGroupID] = group;
        return groups;
    }, {});

    const groupedArray = Object.values(groupedQuestions);

    // Filter groups by level if selectedLevel is set
    const filteredGroups = selectedLevel !== null
        ? groupedArray.filter(group => group[0].Level === selectedLevel)
        : groupedArray; // Show all groups if selectedLevel is null

    const totalPages = Math.ceil(filteredGroups.length / questionsPerPage); // Calculate total pages based on filtered groups

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
        setCompletedQuestions((prev) => ({ ...prev, [questionId]: true }));
    };

    const resetAllQuestions = () => {
        setSelectedAnswers({});
        setCompletedQuestions({});
        setCurrentPage(1); // Reset to the first page when resetting questions
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedGroups = filteredGroups.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage); // Get the current page's groups

    const handleLevelChange = (e) => {
        const value = e.target.value;
        setSelectedLevel(value ? Number(value) : null); // Set selected level or null for all questions
        setCurrentPage(1); // Reset to first page when changing level
    };

    return (
        <>
            <div className="part3">
                <div className="header-container">
                    <div className="intro-box">
                        <h3>Introduction to the Task</h3>
                        <p>
                            <strong>Instructions:</strong> You will complete several questions based on the content you have learned.
                            Please select the most correct answer for each question.
                        </p>
                    </div>
                    <div className="level-selection">
                        <h4>Select Level:</h4>
                        <select onChange={handleLevelChange} value={selectedLevel || ''}>
                            <option value="">All Levels</option>
                            <option value="1">Level 1</option>
                            <option value="2">Level 2</option>
                            <option value="3">Level 3</option>
                            <option value="4">Level 4</option>
                            <option value="5">Level 5</option>
                        </select>
                    </div>
                </div>

                <div className="questions-container">
                    <div className="row">
                        {displayedGroups.map((group) => (
                            <div className="question-groups" key={group[0].QuestionGroupID}>
                                <div className="header">
                                    <span>{`Group ${group[0].QuestionGroupID}`}</span>
                                    {group[0].groupAudio && (
                                        <audio controls>
                                            <source src={group[0].groupAudio} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                </div>

                                <div className="question-cards">
                                    <div className='row'>
                                        {group[0].QuestionImage && (
                                            <img src={group[0].QuestionImage} alt={`Hình ảnh cho nhóm ${group[0].QuestionGroupID}`} className="question-image" />
                                        )}
                                        <div className="question-text">
                                            {group.map((question) => (
                                                <div key={question.QuestionID}>
                                                    <h4>{question.QuestionText}</h4>
                                                    <div className="answers-container">
                                                        {[question.AnswerA, question.AnswerB, question.AnswerC, question.AnswerD].map((answer, index) => {
                                                            const isSelected = selectedAnswers[question.QuestionID] === answer;
                                                            const isCorrect = answer === question.CorrectAnswer;
                                                            let answerClass = '';

                                                            // Chỉ tô màu nếu tất cả câu hỏi trong nhóm đã được trả lời
                                                            if (group.every(q => completedQuestions[q.QuestionID])) {
                                                                if (isSelected && isCorrect) {
                                                                    answerClass = 'correct'; // Tô xanh cho đáp án đúng đã chọn
                                                                } else if (isSelected && !isCorrect) {
                                                                    answerClass = 'incorrect'; // Tô đỏ cho đáp án sai đã chọn
                                                                } else if (isCorrect) {
                                                                    answerClass = 'correct'; // Tô xanh cho đáp án đúng
                                                                }
                                                            }

                                                            return (
                                                                <label key={index} className={`answer-label ${answerClass}`}>
                                                                    <input
                                                                        type="radio"
                                                                        name={`question-${question.QuestionID}`}
                                                                        value={answer}
                                                                        checked={isSelected}
                                                                        onChange={() => handleAnswerChange(question.QuestionID, answer)}
                                                                        disabled={completedQuestions[question.QuestionID]}
                                                                    />
                                                                    {answer}
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Hiển thị nút "Làm lại" chỉ khi tất cả câu hỏi trong nhóm đã được trả lời */}
                                            {group.every(q => completedQuestions[q.QuestionID]) && (
                                                <div style={{ marginTop: '20px' }}>
                                                    <button onClick={resetAllQuestions}>
                                                        Làm lại
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {totalPages > 1 && ( // Pagination only if there are multiple pages
                    <div className="pagination">
                        <button className="page-button" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                            Đầu tiên
                        </button>
                        <button className="page-button" onClick={handlePrevPage} disabled={currentPage === 1}>
                            Trước
                        </button>
                        <span className="page-info">{`Trang ${currentPage} / ${totalPages}`}</span>
                        <button className="page-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Sau
                        </button>
                        <button className="page-button" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                            Cuối cùng
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Part3;