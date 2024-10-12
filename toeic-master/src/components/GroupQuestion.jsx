import React from 'react';

const GroupQuestion = ({ questions }) => {
    return (
        <div>
            {questions.map((question, index) => (
                <div key={index} className="mb-5 border p-4 rounded-lg shadow-md">
                    <h3 className='p-5 bg-blue-300'>{question.QuestionText}</h3>
                    <ul className='mt-10 space-y-2 bg-white'>
                        <li className='p-2 cursor-pointer rounded-xl bg-blue-200' onClick={() => handleClick('A')}>A: {question.AnswerA}</li>
                        <li className='p-2 cursor-pointer rounded-xl bg-blue-200' onClick={() => handleClick('B')}>B: {question.AnswerB}</li>
                        <li className='p-2 cursor-pointer rounded-xl bg-blue-200' onClick={() => handleClick('C')}>C: {question.AnswerC}</li>
                        <li className='p-2 cursor-pointer rounded-xl bg-blue-200' onClick={() => handleClick('D')}>D: {question.AnswerD}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GroupQuestion;
