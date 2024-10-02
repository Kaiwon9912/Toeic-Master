import PartItem from "../components/PartItem";
import React, { useState, useRef,useEffect } from 'react';
import Question from "../components/Question";
function ReadingPage ()
{
    const [question5, setQuestion5] = useState(null);
    const [question6, setQuestion6] = useState(null);
    const [question7, setQuestion7] = useState(null);
    var part5Count ;
    var part6Count ;
    var part7Count ;
   
    const fetchQuestion5 = async () => {
        try {
            const questionResponse = await fetch(`http://localhost:3000/api/question/part/5`);
            if (!questionResponse.ok) {
                throw new Error('Failed to fetch question');
            }
            const questionData = await questionResponse.json();
            part5Count = questionData.length;
            setQuestion5(questionData);
        

     
        } catch (error) {
            console.error('Error fetching question and answers:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchQuestion6 = async () => {
        try {
            const questionResponse = await fetch(`http://localhost:3000/api/question/part/6`);
            if (!questionResponse.ok) {
                throw new Error('Failed to fetch question');
            }
            const questionData = await questionResponse.json();
            part6Count = questionData.length;
            setQuestion6(questionData);
        

     
        } catch (error) {
            console.error('Error fetching question and answers:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchQuestion7 = async () => {
        try {
            const questionResponse = await fetch(`http://localhost:3000/api/question/part/7`);
            
            part7Count = questionData.length;
            if (!questionResponse.ok) {
                throw new Error('Failed to fetch question');
            }
            const questionData = await questionResponse.json();
            setQuestion7(questionData);
        

     
        } catch (error) {
            console.error('Error fetching question and answers:', error);
        } finally {
            setLoading(false);
        }
    };

   
    
    useEffect(() => {
       
        fetchQuestion5();
        fetchQuestion6();
        fetchQuestion7();
     
    }, );
    console.log(part5Count);
    return (
 
        <div className="m-auto max-w-7xl">
      
            <div className="flex">
            <PartItem title="Hoàn thành câu" number={part5Count} />
            <PartItem title="Hoàn thành câu" number={part6Count}/>
            <PartItem title="Hoàn thành câu" number={part7Count}/>
            
            </div>
            <Question part={5}/>
      
        </div>
    );
} export default ReadingPage;