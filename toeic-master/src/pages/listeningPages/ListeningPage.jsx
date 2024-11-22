import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListeningPage.css';
import part1Image from '../../../public/listen_pic_title/part1.jpg';
import part2Image from '../../../public/listen_pic_title/part2.jpg';
import part3Image from '../../../public/listen_pic_title/part3.jpg';
import part4Image from '../../../public/listen_pic_title/part4.jpg';

function ListeningPage() {
    const navigate = useNavigate(); // Thay đổi từ useHistory thành useNavigate

    const handleClick = (part) => {
        navigate(`/listening/${part}`); // Sử dụng navigate để điều hướng
    };

    const stats = [
        {
            Title: "Part 1",
            Content: "Mô Tả Hình Ảnh.",
            CorrectAnswers: 10,
            TotalQuestions: 12,
            Image: part1Image,
            Route: "part1",
        },
        {
            Title: "Part 2",
            Content: "Hỏi - Đáp",
            CorrectAnswers: 8,
            TotalQuestions: 10,
            Image: part2Image,
            Route: "part2",
        },
        {
            Title: "Part 3",
            Content: "Đoạn Hội Thoại",
            CorrectAnswers: 9,
            TotalQuestions: 12,
            Image: part3Image,
            Route: "part3",
        },
        {
            Title: "Part 4",
            Content: "Bài Nói Chuyện Ngắn (độc thoại)",
            CorrectAnswers: 7,
            TotalQuestions: 10,
            Image: part4Image,
            Route: "part4",
        },
    ];

    return (
        <div className="listening-page grid grid-cols-2 gap-4 p-4">
            {stats.map((stat, index) => (
                <div
                    className="stat-box border p-4 rounded-lg shadow-lg"
                    key={index}
                    onClick={() => handleClick(stat.Route)} // Thêm sự kiện click
                    style={{ cursor: 'pointer' }} // Thay đổi con trỏ
                >
                    <img src={stat.Image} alt={stat.Title} className="part-image" />
                    <h2 className="title text-xl font-bold mb-2">{stat.Title}</h2>
                    <p className="content mb-1">Nội dung: {stat.Content}</p>
                    <p className="correct-answers">Số câu đúng: {stat.CorrectAnswers}</p>
                    <p className="total-questions">Số câu đã làm: {stat.TotalQuestions}</p>
                </div>
            ))}
        </div>
    );
}

export default ListeningPage;