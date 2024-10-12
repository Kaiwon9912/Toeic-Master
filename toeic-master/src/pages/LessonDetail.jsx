import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LessonsDetail = () => {
    const { id } = useParams(); // Lấy ID từ params
    const [lesson, setLesson] = useState(null);
    const [questions, setQuestions] = useState([]); // State để lưu danh sách câu hỏi
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // State để lưu lựa chọn câu trả lời

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const lessonResponse = await axios.get(`http://localhost:3000/api/lessons/${id}`);
                setLesson(lessonResponse.data);
                
                // Fetch danh sách câu hỏi liên quan đến bài học
                const questionsResponse = await axios.get(`http://localhost:3000/api/questions/lesson/${id}`);
                setQuestions(questionsResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [id]);

    const handleClick = (questionID, answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionID]: answer }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-1/2 p-5 m-auto">
            {lesson && (
                <div>
                    <h2 className="text-xl font-bold">{lesson.Title}</h2>

                    {lesson.MediaType === 'Video' && (
                        <iframe
                            width="560"
                            height="315"
                            src={lesson.MediaURL.replace("watch?v=", "embed/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}

                    <div className="mt-5">
                        <p>{lesson.Content}</p>
                    </div>

                    {/* Hiển thị danh sách câu hỏi */}
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold">Questions:</h3>
                        {questions.map((question) => (
                            <div key={question.QuestionID} className="mt-5">
                                <h3 className='p-5 bg-blue-300'>{question.QuestionText}</h3>
                                <ul className='mt-10 space-y-2 bg-white'>
                                    {['A', 'B', 'C', 'D'].map((option) => (
                                        <li
                                            key={option}
                                            className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswers[question.QuestionID] === option ? (question.CorrectAnswer === option ? 'bg-green-300' : 'bg-red-300') : ''}`}
                                            onClick={() => handleClick(question.QuestionID, option)}
                                        >
                                            {option}: {question[`Answer${option}`]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonsDetail;
