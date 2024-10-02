import { useEffect, useState } from 'react';

const Question = ({ part }) => {
    const [question, setQuestion] = useState(null);

    const [loading, setLoading] = useState(true);
    const fetchQuestion = async () => {
        try {
            const questionResponse = await fetch(`http://localhost:3000/api/question/part/${part}/random`);
            if (!questionResponse.ok) {
                throw new Error('Failed to fetch question');
            }
            const questionData = await questionResponse.json();
            setQuestion(questionData[0]);
        

     
        } catch (error) {
            console.error('Error fetching question and answers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        

        fetchQuestion();
    }, [part]);

    if (loading) return <div>Loading...</div>;


    
  const handleClick =async  (Answer) => {
   
    if(Answer==question.CorrectAnswer)
    {
        console.log("Right answer");
       
    }
    else
  
    console.log("Wrong answer");
    await fetchQuestion();
   
  };
    return (
        <>
         <div>
            {question && (
                <div>
                    <h3 className='p-5 bg-blue3'>{question.QuestionText}</h3>
                    <ul className='mt-10 space-y-2 bg-white' >
                        <li className='p-2 cursor-pointer rounded-xl bg-blue4' onClick={() => handleClick('A')}>A: {question.AnswerA}</li>
                        <li className='p-2 cursor-pointer rounded-xl bg-blue4'  onClick={() => handleClick('B')}>B: {question.AnswerB}</li>
                        <li className='p-2 cursor-pointer rounded-xl bg-blue4'  onClick={() => handleClick('C')}>C: {question.AnswerC}</li>
                        <li  className='p-2 cursor-pointer rounded-xl bg-blue4' onClick={() => handleClick('D')}>D: {question.AnswerD}</li>
                    </ul>
                </div>
            )}

        </div>
        <div className='fixed text-white bg-blue3'>
            <p>
                Câu trả lời đúng là: {Question.ri}
            </p>
        </div>
        </>
       
    );
};

export default Question;
