import React, { useState } from 'react';
import './part1.css';

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
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[0],
        answers: [
            "A They are looking at each other.",
            "B The woman is typing on a computer.",
            "C The man is using a computer.",
            "D The man is writing something in a notebook."
        ],
        correctAnswer: "A They are looking at each other.",
        level: 1
    },
    {
        id: 2,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[1],
        answers: [
            "A One person is reading a book.",
            "B One person is working.",
            "C One person is walking.",
            "D One person is having lunch."
        ],
        correctAnswer: "B One person is working.",
        level: 2
    },
    {
        id: 3,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[2],
        answers: [
            "A A group of people is laughing.",
            "B One person is talking.",
            "C One person is using a computer.",
            "D One person is looking outside."
        ],
        correctAnswer: "C One person is using a computer.",
        level: 3
    },
    {
        id: 4,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[3],
        answers: [
            "A One person is running.",
            "B One person is dancing.",
            "C One person is walking.",
            "D One person is standing still."
        ],
        correctAnswer: "A One person is running.",
        level: 4
    },
    {
        id: 5,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[4],
        answers: [
            "A One person is sleeping.",
            "B One person is eating.",
            "C One person is working.",
            "D One person is playing sports."
        ],
        correctAnswer: "B One person is eating.",
        level: 5
    },
    {
        id: 6,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[5],
        answers: [
            "A One person is driving.",
            "B One person is walking.",
            "C One person is riding a bicycle.",
            "D One person is waiting for a bus."
        ],
        correctAnswer: "C One person is riding a bicycle.",
        level: 1
    },
    {
        id: 7,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[6],
        answers: [
            "A One person is painting.",
            "B One person is reading a newspaper.",
            "C One person is listening to music.",
            "D One person is talking."
        ],
        correctAnswer: "A One person is painting.",
        level: 2
    },
    {
        id: 8,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[7],
        answers: [
            "A One person is dancing.",
            "B One person is singing.",
            "C One person is doing ballet.",
            "D One person is sitting."
        ],
        correctAnswer: "B One person is singing.",
        level: 3
    },
    {
        id: 9,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[8],
        answers: [
            "A One person is walking.",
            "B One person is running.",
            "C One person is riding a bicycle.",
            "D One person is resting."
        ],
        correctAnswer: "C One person is riding a bicycle.",
        level: 4
    },
    {
        id: 10,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[9],
        answers: [
            "A One person is smiling.",
            "B One person is crying.",
            "C One person is playing.",
            "D One person is standing still."
        ],
        correctAnswer: "A One person is smiling.",
        level: 5
    },
    {
        id: 11,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[10],
        answers: [
            "A A cat is sleeping.",
            "B A dog is barking.",
            "C A bird is flying.",
            "D A fish is swimming."
        ],
        correctAnswer: "A A cat is sleeping.",
        level: 1
    },
    {
        id: 12,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[11],
        answers: [
            "A They are at a restaurant.",
            "B They are at home.",
            "C They are in the park.",
            "D They are at school."
        ],
        correctAnswer: "C They are in the park.",
        level: 2
    },
    {
        id: 13,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[12],
        answers: [
            "A They are playing football.",
            "B They are watching a movie.",
            "C They are studying.",
            "D They are cooking."
        ],
        correctAnswer: "A They are playing football.",
        level: 3
    },
    {
        id: 14,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[13],
        answers: [
            "A They are dancing.",
            "B They are singing.",
            "C They are sleeping.",
            "D They are working."
        ],
        correctAnswer: "B They are singing.",
        level: 4
    },
    {
        id: 15,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[14],
        answers: [
            "A The man is reading.",
            "B The woman is cooking.",
            "C The child is playing.",
            "D The dog is barking."
        ],
        correctAnswer: "C The child is playing.",
        level: 5
    },
    {
        id: 16,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[15],
        answers: [
            "A They are driving a car.",
            "B They are riding a motorcycle.",
            "C They are walking.",
            "D They are flying."
        ],
        correctAnswer: "B They are riding a motorcycle.",
        level: 1
    },
    {
        id: 17,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[16],
        answers: [
            "A It is sunny.",
            "B It is raining.",
            "C It is snowing.",
            "D It is windy."
        ],
        correctAnswer: "A It is sunny.",
        level: 2
    },
    {
        id: 18,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[17],
        answers: [
            "A The train is arriving.",
            "B The bus is leaving.",
            "C The car is parked.",
            "D The bike is broken."
        ],
        correctAnswer: "A The train is arriving.",
        level: 3
    },
    {
        id: 19,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[18],
        answers: [
            "A They are eating dinner.",
            "B They are having breakfast.",
            "C They are making lunch.",
            "D They are cleaning up."
        ],
        correctAnswer: "B They are having breakfast.",
        level: 4
    },
    {
        id: 20,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[19],
        answers: [
            "A The flowers are blooming.",
            "B The leaves are falling.",
            "C The snow is melting.",
            "D The sun is setting."
        ],
        correctAnswer: "A The flowers are blooming.",
        level: 5
    },
    {
        id: 21,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[20],
        answers: [
            "A A child is crying.",
            "B A baby is laughing.",
            "C A dog is barking.",
            "D A cat is purring."
        ],
        correctAnswer: "B A baby is laughing.",
        level: 1
    },
    {
        id: 22,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[21],
        answers: [
            "A The man is painting.",
            "B The woman is driving.",
            "C The child is playing.",
            "D The teacher is teaching."
        ],
        correctAnswer: "D The teacher is teaching.",
        level: 2
    },
    {
        id: 23,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[22],
        answers: [
            "A They are at the beach.",
            "B They are at the zoo.",
            "C They are at the museum.",
            "D They are at the concert."
        ],
        correctAnswer: "C They are at the museum.",
        level: 3
    },
    {
        id: 24,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[23],
        answers: [
            "A The sky is blue.",
            "B The grass is green.",
            "C The sun is hot.",
            "D The clouds are white."
        ],
        correctAnswer: "B The grass is green.",
        level: 4
    },
    {
        id: 25,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[24],
        answers: [
            "A They are running a race.",
            "B They are playing soccer.",
            "C They are swimming.",
            "D They are hiking."
        ],
        correctAnswer: "B They are playing soccer.",
        level: 5
    },
    {
        id: 26,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[25],
        answers: [
            "A A phone is ringing.",
            "B A door is closing.",
            "C A clock is ticking.",
            "D A dog is barking."
        ],
        correctAnswer: "A A phone is ringing.",
        level: 1
    },
    {
        id: 27,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[26],
        answers: [
            "A The cake is baking.",
            "B The soup is boiling.",
            "C The bread is toasting.",
            "D The rice is cooking."
        ],
        correctAnswer: "B The soup is boiling.",
        level: 2
    },
    {
        id: 28,
        image: "/listen_pic_title/Part1/img/img5.jpg",
        audio: audioClips[27],
        answers: [
            "A The book is on the table.",
            "B The pen is in the drawer.",
            "C The paper is on the floor.",
            "D The chair is broken."
        ],
        correctAnswer: "A The book is on the table.",
        level: 3
    },
    {
        id: 29,
        image: "/listen_pic_title/Part1/img/img3.jpg",
        audio: audioClips[28],
        answers: [
            "A They are gardening.",
            "B They are painting.",
            "C They are cleaning.",
            "D They are shopping."
        ],
        correctAnswer: "A They are gardening.",
        level: 4
    },
    {
        id: 30,
        image: "/listen_pic_title/Part1/img/img4.jpg",
        audio: audioClips[29],
        answers: [
            "A The movie is exciting.",
            "B The book is boring.",
            "C The game is fun.",
            "D The song is loud."
        ],
        correctAnswer: "C The game is fun.",
        level: 5
    },
];

function Part1() {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [completedQuestions, setCompletedQuestions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLevel, setSelectedLevel] = useState(null); // Thay đổi giá trị mặc định
    const [showText, setShowText] = useState(false); // Trạng thái để hiển thị toàn bộ câu trả lời
    const questionsPerPage = 9;

    // Lọc câu hỏi theo cấp độ đã chọn
    const filteredQuestions = selectedLevel === null
        ? questions // Hiển thị tất cả câu hỏi nếu không có cấp độ nào được chọn
        : questions.filter(question => question.level === selectedLevel);

    const totalFilteredPages = Math.ceil(filteredQuestions.length / questionsPerPage);

    // Tính toán câu hỏi cần hiển thị dựa trên câu hỏi đã lọc
    const startIndex = (currentPage - 1) * questionsPerPage;
    const displayedQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage);

    const playAudio = (index) => {
        const audio = new Audio(audioClips[index]);
        audio.play();
    };

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
        setCompletedQuestions((prev) => ({ ...prev, [questionId]: true }));
    };

    const resetQuestion = (questionId) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: undefined }));
        setCompletedQuestions((prev) => ({ ...prev, [questionId]: false }));
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
        <div className="part1">
            <div className="header-container">
                <div className="intro-box">
                    <h3>Introduction to the Task</h3>
                    <p>
                        <strong>Instructions:</strong> You will hear a question or statement and three responses spoken in English.
                        These will not be printed in the test and will only be spoken once.
                        Choose the best response to the question or statement and select the letter (A), (B), or (C) for your answer.
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
                    <img src={question.image} alt={`Hình ảnh cho câu ${question.id}`} className="question-images" />
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
                                    {completedQuestions[question.id] && showText ? answer : answer.charAt(0)} {/* Hiển thị toàn bộ đáp án nếu đã hoàn thành và showText là true */}
                                </label>
                            );
                        })}
                    </div>
                    {completedQuestions[question.id] && (
                        <div style={{ marginTop: '20px' }}>
                            <button onClick={() => resetQuestion(question.id)} style={{ marginRight: '10px' }}>
                                Làm lại
                            </button>
                            <button onClick={() => setShowText(!showText)}>
                                {showText ? 'Ẩn đáp án' : 'Hiện đáp án'}
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <div className="pagination">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                    Trang Đầu
                </button>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Trang Trước
                </button>
                <span>{`Trang ${currentPage} / ${totalFilteredPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalFilteredPages}>
                    Trang Tiếp
                </button>
                <button onClick={() => setCurrentPage(totalFilteredPages)} disabled={currentPage === totalFilteredPages}>
                    Trang Cuối
                </button>
            </div>
        </div>
    );
}

export default Part1;