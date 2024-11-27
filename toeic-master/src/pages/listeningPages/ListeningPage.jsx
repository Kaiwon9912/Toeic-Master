import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListeningPage.css'; // Đảm bảo đã liên kết với CSS
import Header from '../../components/header';
import Footer from '../../components/Footer';
import part1Image from '../../../public/listen_pic_title/part1.jpg';
import part2Image from '../../../public/listen_pic_title/part2.jpg';
import part3Image from '../../../public/listen_pic_title/part3.jpg';
import part4Image from '../../../public/listen_pic_title/part4.jpg';

function ListeningPage() {
    const navigate = useNavigate(); // Hook điều hướng

    const [isScrolled, setIsScrolled] = useState(false); // State kiểm tra khi người dùng cuộn trang

    // Hàm điều hướng đến các phần của bài học
    const handleClick = (part) => {
        navigate(`/listening/${part}`);
    };

    // Kiểm tra trạng thái cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Dữ liệu các phần bài học
    const stats = [
        {
            Title: "Part 1",
            Content: "Mô Tả Hình Ảnh.",
            CorrectAnswers: 10,
            TotalQuestions: 12,
            Image: part1Image,
            Route: "part1",
            Duration: "5-10 phút",
        },
        {
            Title: "Part 2",
            Content: "Hỏi - Đáp",
            CorrectAnswers: 8,
            TotalQuestions: 10,
            Image: part2Image,
            Route: "part2",
            Duration: "10-15 phút",
        },
        {
            Title: "Part 3",
            Content: "Đoạn Hội Thoại",
            CorrectAnswers: 9,
            TotalQuestions: 12,
            Image: part3Image,
            Route: "part3",
            Duration: "15-20 phút",
        },
        {
            Title: "Part 4",
            Content: "Bài Nói Chuyện Ngắn (độc thoại)",
            CorrectAnswers: 7,
            TotalQuestions: 10,
            Image: part4Image,
            Route: "part4",
            Duration: "5-10 phút",
        },
    ];

    // Hiển thị thông báo khi không có kết quả
    const renderNoResultsMessage = () => {
        return <div className="no-results">Không có dữ liệu hiển thị!</div>;
    };

    return (
        <>
            <Header />
            <div className="listening-page">
                <h1 className="title">Listening Practice</h1>
                <p className="page-description">Choose a section to start listening practice and test your ability.</p>

                {/* Hiển thị thông báo nếu không có kết quả */}
                {stats.length === 0 ? renderNoResultsMessage() : (
                    <div className="grid">
                        {stats.map((stat, index) => (
                            <div
                                className="stat-box"
                                key={index}
                                onClick={() => handleClick(stat.Route)}
                            >
                                <img src={stat.Image} alt={stat.Title} className="part-image" />
                                <div className="content-wrapper">
                                    <h2 className="title-stat">{stat.Title}</h2>
                                    <p className="content">{stat.Content}</p>
                                    <p className="duration">Time: {stat.Duration}</p>
                                    <div className="stat-footer">
                                        <p className="correct-answers">Correct sentence: {stat.CorrectAnswers}</p>
                                        <p className="total-questions">Sentence done: {stat.TotalQuestions}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Nút Back to Top */}
                {isScrolled && (
                    <button
                        className="back-to-top"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Back to top
                    </button>
                )}
            </div>
            <Footer />
        </>
    );
}

export default ListeningPage;
