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


    return (
        <div>asdkjasjdajsd</div>

    );
};

export default VocabularyPage;
