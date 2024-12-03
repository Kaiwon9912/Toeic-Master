import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Question = ({ onAnswerUpdate, data }) => {



    const [selectedAnswer, setSelectedAnswer] = useState(null);
    useEffect(() => {
        setSelectedAnswer(null);
    }, [data]);
    const question = data;

    const handleClick = (Answer) => {

        setSelectedAnswer(Answer);
        if (selectedAnswer === null)
            onAnswerUpdate(Answer === question.CorrectAnswer); // Gọi hàm update từ QuestionPart

    };




    return (
        <>
            <div>
                {question && (
                    <div>
                        <h3 className='p-5 bg-blue-300 mt-10'>{question.QuestionText}</h3>
                        <ul className='mt-10 space-y-2 bg-white'>
                            <li className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'A' ? (question.CorrectAnswer === 'A' ? 'bg-green-300' : 'bg-red-300') : ''}`} onClick={() => handleClick('A')}>A: {question.AnswerA}</li>
                            <li className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'B' ? (question.CorrectAnswer === 'B' ? 'bg-green-300' : 'bg-red-300') : ''}`} onClick={() => handleClick('B')}>B: {question.AnswerB}</li>
                            <li className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'C' ? (question.CorrectAnswer === 'C' ? 'bg-green-300' : 'bg-red-300') : ''}`} onClick={() => handleClick('C')}>C: {question.AnswerC}</li>
                            <li className={`p-2 cursor-pointer rounded-xl bg-blue-200 ${selectedAnswer === 'D' ? (question.CorrectAnswer === 'D' ? 'bg-green-300' : 'bg-red-300') : ''}`} onClick={() => handleClick('D')}>D: {question.AnswerD}</li>
                        </ul>
                    </div>
                )}
                {selectedAnswer && !question.ExamQuestion && (
                    <div className='my-8 h-36 w-full'>
                        <p className='bg-blue-400 text-white h-36 p-4 rounded-xl'>
                            Giải thích: {question.Explanation}
                        </p>

                    </div>
                )}
            </div>
        </>
    );
};

export default Question;
