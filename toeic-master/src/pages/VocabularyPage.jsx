import React, { useEffect, useState } from 'react';
import axios from 'axios';

import VocabularyItem from '../components/VocabularyItem';

const VocabularyPage = () => {
    const [topics, setTopics] = useState([]);
    const [selectedTopicID, setSelectedTopicID] = useState(2);
    const [vocabulary, setVocabulary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/topics'); 
                setTopics(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);
    useEffect(() => {
        if (selectedTopicID !== null) {
            const fetchVocabularyByTopic = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:3000/api/vocabulary/topic/${selectedTopicID}`);
                    setVocabulary(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchVocabularyByTopic();
        }
    }, [selectedTopicID]);
    if (loading) {
        return <div><img src='/src/assets/loading.gif'/></div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <>
       
         <div className='max-w-7xl m-auto'>
             
         
             <ul className='fixed  bg-blue-200'>
               <h1 className='text-center font-bold text-xl bg-blue-400 p-2'>Chủ đề</h1>
                 {topics.map(topic => (
                     <li className='p-2 m-2 rounded-2xl hover:scale-110 cursor-pointer hover:bg-blue-50' key={topic.TopicID}
                     onClick={() => setSelectedTopicID(topic.TopicID)}
                     >
                       {topic.Name}   
                     </li>
                 ))}
             </ul>
            
           {selectedTopicID && (
                 <div>
                     {/* <h2>Từ vựng cho chủ đề: {topics.find(t => t.TopicID === selectedTopicID)?.Name}</h2> */}
                     <ul className='m-auto space-y-2 w-96'>
                         {vocabulary.map(word => (
                             <li key={word.WordID}><VocabularyItem word={word.Word}/></li>
                         ))}
                     </ul>
                 </div>
             )}
         </div>
        </>
       
    );
};

export default VocabularyPage;
