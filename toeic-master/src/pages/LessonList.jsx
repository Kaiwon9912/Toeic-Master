import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LessonList = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/lessons');
                setLessons(response.data);
            } catch (error) {
                console.error('Error fetching lessons:', error);
                setError('Failed to load lessons');
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-1/2 p-5 m-auto">
            <h1 className="text-2xl font-bold mb-4">Danh Sách Bài Học</h1>
            <ul className="space-y-4">
                {lessons.map((lesson) => (
                    <li key={lesson.LessonID} className="border p-4 rounded-lg shadow-md">
                        <Link to={`/lessons/${lesson.LessonID}`} className="text-blue-500 hover:underline">
                            <h2 className="text-xl font-semibold">{lesson.Title}</h2>
                        </Link>
                        <p>{lesson.Content.substring(0, 100)}...</p> {/* Hiển thị một đoạn ngắn của nội dung */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonList;
