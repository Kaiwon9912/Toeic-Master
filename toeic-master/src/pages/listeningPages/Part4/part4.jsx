import React, { useState } from 'react';
import './part4.css';
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
        groupID: 1,
        image: "/listen_pic_title/Part3/img/img1.jpg", // Hình ảnh 1
        audio: audioClips[0],
        questionText: "1. What is the woman preparing for?",
        answers: ["A move to a new city", "A business trip", "A building tour", "A meeting with visiting colleagues"],
        correctAnswer: "A move to a new city",
        level: 2
    },
    {
        id: 2,
        groupID: 1,
        image: null, // Không có hình ảnh
        audio: audioClips[1],
        questionText: "2. Who most likely is the man?",
        answers: ["An accountant", "An administrative assistant", "A marketing director", "A company president"],
        correctAnswer: "A marketing director",
        level: 2
    },
    {
        id: 3,
        groupID: 1,
        image: null, // Không có hình ảnh
        audio: audioClips[2],
        questionText: "3. What does the woman want to pick up on Friday morning?",
        answers: ["A building map", "A room key", "An ID card", "A parking pass"],
        correctAnswer: "A room key",
        level: 2
    },
    {
        id: 4,
        groupID: 2,
        image: "/listen_pic_title/Part3/img/img2.jpg", // Hình ảnh 2
        audio: audioClips[3],
        questionText: "1. Where is the meeting taking place?",
        answers: ["In the main conference room", "At the hotel", "In a different city", "In the cafeteria"],
        correctAnswer: "In the main conference room",
        level: 3
    },
    {
        id: 5,
        groupID: 2,
        image: null, // Không có hình ảnh
        audio: audioClips[4],
        questionText: "2. What time does the meeting start?",
        answers: ["10 AM", "11 AM", "1 PM", "2 PM"],
        correctAnswer: "10 AM",
        level: 3
    },
    {
        id: 6,
        groupID: 2,
        image: null, // Không có hình ảnh
        audio: audioClips[5],
        questionText: "3. Who will be attending the meeting?",
        answers: ["Only the marketing team", "All department heads", "The CEO", "None of the above"],
        correctAnswer: "All department heads",
        level: 3
    },
    {
        id: 7,
        groupID: 3,
        image: "/listen_pic_title/Part3/img/img3.jpg", // Hình ảnh 3
        audio: audioClips[6],
        questionText: "1. What is the main topic of discussion?",
        answers: ["Budget cuts", "New project proposals", "Employee satisfaction", "Company policies"],
        correctAnswer: "New project proposals",
        level: 4
    },
    {
        id: 8,
        groupID: 3,
        image: null, // Không có hình ảnh
        audio: audioClips[7],
        questionText: "2. What should the attendees bring?",
        answers: ["Their laptops", "Lunch", "Reports", "All of the above"],
        correctAnswer: "All of the above",
        level: 4
    },
    {
        id: 9,
        groupID: 3,
        image: null, // Không có hình ảnh
        audio: audioClips[8],
        questionText: "3. How long is the meeting expected to last?",
        answers: ["30 minutes", "1 hour", "2 hours", "All day"],
        correctAnswer: "1 hour",
        level: 4
    },
    {
        id: 10,
        groupID: 4,
        image: "/listen_pic_title/Part3/img/img1.jpg", // Hình ảnh 1
        audio: audioClips[9],
        questionText: "1. What will be provided during the meeting?",
        answers: ["Coffee and snacks", "Lunch only", "No refreshments", "Dinner"],
        correctAnswer: "Coffee and snacks",
        level: 2
    },
    {
        id: 11,
        groupID: 4,
        image: null, // Không có hình ảnh
        audio: audioClips[10],
        questionText: "2. What happens if someone is late?",
        answers: ["They will miss the presentation", "They can join anytime", "There will be no consequences", "They will not be allowed in"],
        correctAnswer: "They will miss the presentation",
        level: 2
    },
    {
        id: 12,
        groupID: 4,
        image: null, // Không có hình ảnh
        audio: audioClips[11],
        questionText: "3. Who is responsible for taking notes?",
        answers: ["The intern", "The manager", "Everyone", "No one"],
        correctAnswer: "The intern",
        level: 2
    },
    {
        id: 13,
        groupID: 5,
        image: "/listen_pic_title/Part3/img/img2.jpg", // Hình ảnh 2
        audio: audioClips[12],
        questionText: "1. Where can the meeting agenda be found?",
        answers: ["In the shared drive", "On the bulletin board", "In the meeting room", "All of the above"],
        correctAnswer: "In the shared drive",
        level: 3
    },
    {
        id: 14,
        groupID: 5,
        image: null, // Không có hình ảnh
        audio: audioClips[13],
        questionText: "2. What is the purpose of the meeting?",
        answers: ["To discuss performance", "To plan a team outing", "To review budgets", "All of the above"],
        correctAnswer: "All of the above",
        level: 3
    },
    {
        id: 15,
        groupID: 5,
        image: null, // Không có hình ảnh
        audio: audioClips[14],
        questionText: "3. Who is leading the meeting?",
        answers: ["The head of HR", "The CEO", "The project manager", "The intern"],
        correctAnswer: "The project manager",
        level: 3
    },
    {
        id: 16,
        groupID: 6,
        image: "/listen_pic_title/Part3/img/img1.jpg", // Hình ảnh 1
        audio: audioClips[15],
        questionText: "1. What technology will be used during the meeting?",
        answers: ["Video conferencing", "Presentation software", "Survey tools", "All of the above"],
        correctAnswer: "All of the above",
        level: 4
    },
    {
        id: 17,
        groupID: 6,
        image: null, // Không có hình ảnh
        audio: audioClips[16],
        questionText: "2. How many people are expected to attend?",
        answers: ["5-10", "15-20", "20-30", "Over 30"],
        correctAnswer: "20-30",
        level: 4
    },
    {
        id: 18,
        groupID: 6,
        image: null, // Không có hình ảnh
        audio: audioClips[17],
        questionText: "3. What should be prepared for remote attendees?",
        answers: ["A video link", "A phone call", "A document", "All of the above"],
        correctAnswer: "All of the above",
        level: 4
    },
    {
        id: 19,
        groupID: 7,
        image: "/listen_pic_title/Part3/img/img1.jpg", // Hình ảnh 1
        audio: audioClips[18],
        questionText: "1. What is one key outcome expected from the meeting?",
        answers: ["Action items", "Feedback", "Updates", "All of the above"],
        correctAnswer: "All of the above",
        level: 5
    },
    {
        id: 20,
        groupID: 7,
        image: null, // Không có hình ảnh
        audio: audioClips[19],
        questionText: "2. How will the meeting's results be communicated?",
        answers: ["Email summary", "Team meeting", "Newsletter", "All of the above"],
        correctAnswer: "All of the above",
        level: 5
    },
    {
        id: 21,
        groupID: 7,
        image: null, // Không có hình ảnh
        audio: audioClips[20],
        questionText: "3. What should participants do after the meeting?",
        answers: ["Review notes", "Send feedback", "Follow up on tasks", "All of the above"],
        correctAnswer: "All of the above",
        level: 5
    },
    {
        id: 22,
        groupID: 8,
        image: "/listen_pic_title/Part3/img/img2.jpg", // Hình ảnh 2
        audio: audioClips[21],
        questionText: "1. What should you do if you can't attend the meeting?",
        answers: ["Notify the organizer", "Send a delegate", "Request the minutes", "All of the above"],
        correctAnswer: "All of the above",
        level: 4
    },
    {
        id: 23,
        groupID: 8,
        image: null, // Không có hình ảnh
        audio: audioClips[22],
        questionText: "2. Which of the following is not a good practice for meetings?",
        answers: ["Arriving on time", "Interrupting others", "Taking notes", "Preparing in advance"],
        correctAnswer: "Interrupting others",
        level: 4
    },
    {
        id: 24,
        groupID: 8,
        image: null, // Không có hình ảnh
        audio: audioClips[23],
        questionText: "3. What is a common reason for meetings to fail?",
        answers: ["Lack of agenda", "Too many attendees", "Poor time management", "All of the above"],
        correctAnswer: "All of the above",
        level: 4
    },
    {
        id: 25,
        groupID: 9,
        image: "/listen_pic_title/Part3/img/img1.jpg", // Hình ảnh 1
        audio: audioClips[24],
        questionText: "1. How should feedback be given during the meeting?",
        answers: ["Constructively", "Negatively", "Indifferently", "All of the above"],
        correctAnswer: "Constructively",
        level: 4
    },
    {
        id: 26,
        groupID: 9,
        image: null, // Không có hình ảnh
        audio: audioClips[25],
        questionText: "2. When should questions be asked?",
        answers: ["During the presentation", "At the end", "Whenever", "Not at all"],
        correctAnswer: "At the end",
        level: 4
    },
    {
        id: 27,
        groupID: 9,
        image: null, // Không có hình ảnh
        audio: audioClips[26],
        questionText: "3. Why is it important to follow up after the meeting?",
        answers: ["To ensure tasks are completed", "To gather opinions", "To avoid misunderstandings", "All of the above"],
        correctAnswer: "All of the above",
        level: 4
    },
];

function Part4() {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [completedQuestions, setCompletedQuestions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLevel, setSelectedLevel] = useState(null); // State for selected level
    const questionsPerPage = 2; // Display two question groups per page

    // Group questions by groupID
    const groupedQuestions = questions.reduce((groups, question) => {
        const group = groups[question.groupID] || [];
        group.push(question);
        groups[question.groupID] = group;
        return groups;
    }, {});

    const groupedArray = Object.values(groupedQuestions);

    // Filter groups by level if selectedLevel is set
    const filteredGroups = selectedLevel !== null
        ? groupedArray.filter(group => group[0].level === selectedLevel)
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
            <Header />
            <div className="part4">
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
                            <div className="question-groups" key={group[0].groupID}>
                                <div className="header">
                                    <span>{`Câu ${group[0].id}`}</span>
                                    <audio id={`audio-${group[0].id}`} src={group[0].audio} controls />
                                </div>

                                <div className="question-cards">
                                    <div className='row'>
                                        {group[0].image && (
                                            <img src={group[0].image} alt={`Hình ảnh cho câu ${group[0].id}`} className="question-image" />
                                        )}
                                        <div className="question-text">
                                            {group.map((question) => (
                                                <div key={question.id}>
                                                    <h4>{question.questionText}</h4>
                                                    <div className="answers-container">
                                                        {question.answers.map((answer) => {
                                                            const isSelected = selectedAnswers[question.id] === answer;
                                                            const isCorrect = answer === question.correctAnswer;
                                                            let answerClass = '';

                                                            // Chỉ tô màu nếu tất cả câu hỏi trong nhóm đã được trả lời
                                                            if (group.every(q => completedQuestions[q.id])) {
                                                                if (isSelected && isCorrect) {
                                                                    answerClass = 'correct'; // Tô xanh cho đáp án đúng đã chọn
                                                                } else if (isSelected && !isCorrect) {
                                                                    answerClass = 'incorrect'; // Tô đỏ cho đáp án sai đã chọn
                                                                } else if (isCorrect) {
                                                                    answerClass = 'correct'; // Tô xanh cho đáp án đúng
                                                                }
                                                            }

                                                            return (
                                                                <label key={answer} className={`answer-label ${answerClass}`}>
                                                                    <input
                                                                        type="radio"
                                                                        name={`question-${question.id}`}
                                                                        value={answer}
                                                                        checked={isSelected}
                                                                        onChange={() => handleAnswerChange(question.id, answer)}
                                                                        disabled={completedQuestions[question.id]}
                                                                    />
                                                                    {answer}
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Hiển thị nút "Làm lại" chỉ khi tất cả câu hỏi trong nhóm đã được trả lời */}
                                            {group.every(q => completedQuestions[q.id]) && (
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
            </div>
            <Footer />
        </>

    );
}

export default Part4;