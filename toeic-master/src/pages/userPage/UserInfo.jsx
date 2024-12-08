import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../../hooks/UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icon mắt

const UserInfo = () => {
    const { user } = useUser();
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [examHistory, setExamHistory] = useState([]);
    const [savedVocabulary, setSavedVocabulary] = useState([]);
    const [savedQuestions, setSavedQuestions] = useState([]);
    
    // Thông tin phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const userId = 2; // Giả lập userId

        // Fetch thông tin người dùng
        axios.get(`http://localhost:3000/api/users/${userId}`).then((response) => {
            setUserInfo(response.data);
        });

        // Fetch lịch sử thi với phân trang
        fetchExamHistory(userId, currentPage);
        
        // Fetch từ vựng đã lưu
        axios.get(`http://localhost:3000/api/vocabulary/user/${userId}`).then((response) => {
            setSavedVocabulary(response.data);
        });

        // Fetch câu hỏi đã lưu
        axios.get(`http://localhost:3000/api/saved-questions/user/${userId}`).then((response) => {
            setSavedQuestions(response.data);
        });
    }, [currentPage]);

    const fetchExamHistory = async (userId, page) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/results/user/${userId}`, {
                params: { page, pageSize }
            });
         
            setExamHistory(response.data);
            console.log(examHistory);
            setTotalPages(response.data.totalPages); // Giả sử server trả về tổng số trang
        } catch (error) {
            console.error('Lỗi khi lấy lịch sử thi:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/users/${user.username}`, userInfo);
            setMessage('Thông tin đã được cập nhật thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            setMessage('Đã xảy ra lỗi trong quá trình cập nhật.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

  return (
    <div className="container mx-auto p-8">
        <div className="grid grid-cols-2 gap-8">
            {/* Cột 1: Thông Tin Người Dùng */}
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                {/* Avatar */}
                <div className="mb-6">
                  <img
                    src="https://via.placeholder.com/150" // Thêm URL ảnh đại diện mặc định
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                  />
                </div>

                <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
                    {message && <p className="text-green-500 mb-4">{message}</p>}

                    <div>
                        <label className="block text-lg font-medium text-left">Tên đăng nhập:</label>
                        <div className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100">
                            {user.username}
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-left">Vai trò:</label>
                        <div className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100">
                            {user.role === true ? 'Quản trị viên' : 'Người dùng'}
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-left">Họ và Tên:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={userInfo.fullName}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-left">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-lg font-medium text-left">Mật khẩu:</label>
                        <div className="flex items-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="w-1/12 left-full p-3.5 focus:outline-none"
                                style={{ cursor: 'default' }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Cập nhật thông tin
                    </button>
                </form>
            </div>

            {/* Cột 2: Ôn Tập */}
            <div className="bg-white shadow rounded-lg p-6">
                {/* Lịch sử thi */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Lịch Sử Thi</h2>
                    {examHistory.length > 0 ? (
                    <ul>
                        {examHistory.map((exam) => (
                            <li key={exam.ResultID} className="border-b py-2">
                                <b>Bài thi:</b> {exam.ExamID} - <b>Điểm:</b> {exam.Score} - <b>Ngày:</b> {exam.CompletedDate}
                            </li>
                        ))}
                    </ul>
                    ) : (
                    <p>Chưa có lịch sử thi nào.</p>
                    )}

                    {/* Phân trang */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            Trang Trước
                        </button>
                        <span>
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            Trang Sau
                        </button>
                    </div>
                </div>

                {/* Từ vựng đã lưu */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Từ Vựng Đã Lưu</h2>
                    {savedVocabulary.length > 0 ? (
                        <ul>
                            {savedVocabulary.map((vocab, index) => (
                                <li key={index}>{vocab.word}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Chưa có từ vựng đã lưu.</p>
                    )}
                </div>

                {/* Câu hỏi đã lưu */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Câu Hỏi Đã Lưu</h2>
                    {savedQuestions.length > 0 ? (
                        <ul>
                            {savedQuestions.map((question, index) => (
                                <li key={index}>{question.questionText}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Chưa có câu hỏi đã lưu.</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default UserInfo;
