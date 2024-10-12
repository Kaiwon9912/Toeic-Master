import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Question = ({ part, onAnswerUpdate }) => {
    const [question, setQuestion] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const fetchQuestion = async () => {
        try {
            const questionResponse = await fetch(`http://localhost:3000/api/question/part/${part}/random`);
            if (!questionResponse.ok) {
                throw new Error('Failed to fetch question');
            }
            const questionData = await questionResponse.json();
            setQuestion(questionData[0]);
            setSelectedAnswer(null);
        } catch (error) {
            console.error('Error fetching question and answers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [part]);

    const handleClick = (Answer) => {
        setIsClicked(true);
        setSelectedAnswer(Answer);
        onAnswerUpdate(Answer === question.CorrectAnswer); // Gọi hàm update từ QuestionPart
    };

    const handleNext = () => {
        setIsClicked(false);
        fetchQuestion();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div>
                {question && (
                    <div>
                        <h3 className='p-5 bg-blue-300'>{question.QuestionText}</h3>
                        <ul className='mt-10 space-y-2 bg-white'>
                            <li className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'A' ? (question.CorrectAnswer === 'A' ? 'bg-green-300' : 'bg-red-300') : ''}`} onClick={() => handleClick('A')}>A: {question.AnswerA}</li>
                            <li className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'B' ? (question.CorrectAnswer === 'B' ? 'bg-green-300' : 'bg-red-300') : ''}`} onClick={() => handleClick('B')}>B: {question.AnswerB}</li>
                            <li className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'C' ? (question.CorrectAnswer === 'C' ? 'bg-green-300' : 'bg-red-300') : ''}`} onClick={() => handleClick('C')}>C: {question.AnswerC}</li>
                            <li className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'D' ? (question.CorrectAnswer === 'D' ? 'bg-green-300' : 'bg-red-300') : ''}`} onClick={() => handleClick('D')}>D: {question.AnswerD}</li>
                        </ul>
                    </div>
                )}
                {isClicked && question && (
                    <div className='mt-10 h-36 w-full'>
                        <p className='bg-blue-500 text-white h-36 p-4'>
                            Giải thích: {question.Explaination}
                        </p>
                        <button className='mt-4 p-2 bg-green-500 text-white rounded' onClick={handleNext}>
                            Tiếp theo
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Question;
