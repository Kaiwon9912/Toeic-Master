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
        <div>
             <div className="flex px-5 py-2 text-white bg-blue2 ">
            <h1>Từ vựng</h1>
            </div>
         
            <ul className='flex justify-center'>
                {topics.map(topic => (
                    <li className='p-2 m-2 bg-blue3 rounded-2xl hover:scale-110' key={topic.TopicID}
                    onClick={() => setSelectedTopicID(topic.TopicID)}
                    >
                      {topic.Name}   
                    </li>
                ))}
            </ul>
           
          {selectedTopicID && (
                <div>
                    {/* <h2>Từ vựng cho chủ đề: {topics.find(t => t.TopicID === selectedTopicID)?.Name}</h2> */}
                    <ul className='w-64 m-auto space-y-2'>
                        {vocabulary.map(word => (
                            <li key={word.WordID}><VocabularyItem word={word.Word}/></li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VocabularyPage;
