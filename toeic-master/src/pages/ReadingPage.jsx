import PartItem from "../components/PartItem";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReadingPage() {
    const [stats, setStats] = useState([]);
    const userId = 1; // Cố định userId là 1

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user-question-stats/${userId}`);
                console.log("Fetched data:", response.data); // Kiểm tra dữ liệu
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="m-auto max-w-7xl">
            <div className="flex">
                {stats.map(stat => (
                    <a 
                        href={`#/reading/part/${stat.PartID}`}  // Đường dẫn URL đúng
                        key={stat.PartID} 
                    >
                        <PartItem 
                            id={stat.PartID}
                            title={stat.Title}
                            number={stat.TotalQuestions}
                            learned={stat.CompletedQuestions}
                            incorrect={stat.IncorrectQuestions}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default ReadingPage;
