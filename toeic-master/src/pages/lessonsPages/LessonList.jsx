import React from 'react';
import { useNavigate } from 'react-router-dom';
import Listening from './Listening'; // Import if needed for other purposes

const LessonList = () => {
    const navigate = useNavigate();

    const handleLessonClick = (lessonId) => {
        navigate(`/lessons/${lessonId}`);
    };

    return (
        <div className="w-3/4 p-5 m-auto">
            <h1 className="text-3xl font-bold mb-5 text-center">Lesson List</h1>
            <div className="grid grid-cols-2 gap-6">
                <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center bg-green-200">
                    <div className="text-6xl mb-3">🎧</div>
                    <h2 className="text-lg font-bold">Listening Lessons</h2>
                    <p className="text-center">Improve your listening comprehension with engaging audio materials.</p>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleLessonClick('Listening')}
                    >
                        Get Started
                    </button>
                </div>

                <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center bg-yellow-200">
                    <div className="text-6xl mb-3">🗣️</div>
                    <h2 className="text-lg font-bold">Speaking Lessons</h2>
                    <p className="text-center">Develop your communication skills through interactive speaking exercises.</p>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleLessonClick('Speaking')}
                    >
                        Get Started
                    </button>
                </div>

                <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center bg-blue-200">
                    <div className="text-6xl mb-3">📖</div>
                    <h2 className="text-lg font-bold">Reading Lessons</h2>
                    <p className="text-center">Enhance your reading comprehension with a variety of texts.</p>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleLessonClick('Reading')}
                    >
                        Get Started
                    </button>
                </div>

                <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center bg-pink-200">
                    <div className="text-6xl mb-3">✍️</div>
                    <h2 className="text-lg font-bold">Writing Lessons</h2>
                    <p className="text-center">Improve your writing skills with structured practice and feedback.</p>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleLessonClick('Writing')}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonList;