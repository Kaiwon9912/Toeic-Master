import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Reading() {
    const [openPart, setOpenPart] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [lessonContent, setLessonContent] = useState({});
    const [currentPart, setCurrentPart] = useState('');
    const [lessons, setLessons] = useState({});
    const [parts, setParts] = useState([]);

    // Hàm để lấy dữ liệu các phần từ API
    const fetchParts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/parts');
            console.log('Dữ liệu phản hồi cho các phần:', response.data);
            setParts(response.data); // Cập nhật state parts với dữ liệu lấy được
            // Gọi hàm lấy bài học sau khi đã có phần
            fetchLessons(response.data.slice(-3)); // Lấy bài học của 3 phần cuối cùng
        } catch (error) {
            console.error('Lỗi khi lấy các phần:', error.message);
        }
    };

    // Hàm để lấy dữ liệu bài học từ API
    const fetchLessons = async (lastThreeParts) => {
        try {
            const response = await axios.get('http://localhost:3000/api/lessons');
            if (!Array.isArray(response.data) || response.data.length === 0) {
                throw new Error('Không tìm thấy bài học hoặc định dạng dữ liệu không hợp lệ');
            }

            const formattedLessons = response.data.reduce((acc, lesson) => {
                const partKey = lesson.PartID; // Sử dụng PartID trực tiếp
                if (lastThreeParts.find(part => part.PartID === partKey)) { // Kiểm tra nếu phần nằm trong 3 phần cuối
                    if (!acc[partKey]) {
                        acc[partKey] = [];
                    }
                    acc[partKey].push({
                        title: lesson.Title,
                        content: {
                            questionType: lesson.QuestionType,
                            guide: lesson.Guide.split('\n')
                        }
                    });
                }
                return acc;
            }, {});

            setLessons(formattedLessons); // Cập nhật bài học với các phần cuối cùng
        } catch (error) {
            console.error('Lỗi khi lấy bài học:', error.message);
        }
    };

    // Gọi hàm fetch khi component mount
    useEffect(() => {
        fetchParts();
    }, []);

    const togglePart = (partID) => {
        setOpenPart(openPart === partID ? null : partID);
        const partNumber = Object.keys(lessons).indexOf(partID) + 1;
        setCurrentPart(`part${partNumber}`);
    };

    const handleLessonClick = (lessonName, content) => {
        setSelectedLesson(lessonName);
        setLessonContent(content);
        document.getElementById('lesson-content').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex">
            <div className="w-1/4 p-4 ml-12">
                <ul className="mt-4">
                    {parts.slice(-3).map((part) => ( // Hiển thị 3 phần cuối cùng
                        <li key={part.PartID}>
                            <button
                                onClick={() => togglePart(part.PartID)}
                                className="block w-full text-left p-2 hover:bg-gray-300 rounded-lg transition duration-200 text-2xl font-bold">
                                {part.Title} {/* Hiển thị tiêu đề của phần */}
                            </button>
                            {openPart === part.PartID && (
                                <ul className="ml-4 mt-2">
                                    {lessons[part.PartID]?.map((lesson, lessonIndex) => (
                                        <li key={lessonIndex}>
                                            <button
                                                onClick={() => handleLessonClick(lesson.title, lesson.content)}
                                                className={`block p-2 hover:bg-gray-300 rounded-lg transition duration-200 text-xl text-left ${selectedLesson === lesson.title ? 'bg-gray-400' : ''}`}>
                                                {lesson.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-3/4 p-4 ml-4" id="lesson-content">
                {selectedLesson && (
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-center">{selectedLesson}</h3>
                        <h4 className="text-2xl font-semibold mt-4"><strong>1. Question type</strong></h4>
                        <p className="text-xl">{lessonContent.questionType}</p>
                        <h4 className="text-2xl font-semibold mt-4"><strong>2.  Guide to answer</strong></h4>
                        <ul className="list-none ml-5">
                            {lessonContent.guide && lessonContent.guide.map((item, index) => (
                                <li key={index} className="text-xl mb-2">
                                    - {item}
                                </li>
                            ))}
                        </ul>
                        <div className="text-right mt-4">
                            <Link
                                to={`/listening/${currentPart}`}
                                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                                Take an example
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Reading;