import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Question from '../components/Question';

const LessonsDetail = () => {
    const { id } = useParams(); 
    const [lesson, setLesson] = useState(null);
    const [questions, setQuestions] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({}); 

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const lessonResponse = await axios.get(`http://localhost:3000/api/lessons/${id}`);
                setLesson(lessonResponse.data);
                
             
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
        <div className="w-1/2 p-5 m-auto ">
            {lesson && (
                <div>
                    <h2 className="text-xl font-bold uppercase mb-10">{lesson.Title}</h2>

                    {lesson.MediaType === 'Video' && (
                        <iframe
                            width="720"
                            height="360"
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

             
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold">Câu hỏi ôn tập</h3>
                        {questions.map((question,index) => (
                            
                           <Question data={question} key={index}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonsDetail;
