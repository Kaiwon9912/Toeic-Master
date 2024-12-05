import React, { useState, useEffect } from "react";
import { useUser } from '../../hooks/UserContext';
import axios from 'axios';
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

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${user.username}`);
                setUserInfo({
                    fullName: response.data.FullName,
                    email: response.data.Email,
                    password: response.data.PasswordHash,
                });
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };

        fetchUserInfo();
    }, [user.username]);

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

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Thông Tin Người Dùng</h1>
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
                {message && <p className="text-green-500 mb-4">{message}</p>}

                <div className="mb-4">
                    <label className="block text-2xl font-medium text-left">Tên đăng nhập:</label>
                    <div className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-2xl">
                        {user.username}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-2xl font-medium text-left">Vai trò:</label>
                    <div className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-2xl">
                        {user.role === true ? 'Quản trị viên' : 'Người dùng'}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-2xl font-medium text-left">Họ và Tên:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={userInfo.fullName}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-2xl"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-2xl font-medium text-left">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full text-2xl"
                    />
                </div>

                <div className="mb-4 relative">
                    <label className="block text-2xl font-medium text-left">Mật khẩu:</label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full pr-10 text-2xl" // Thêm padding bên phải để tạo không gian cho biểu tượng
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="w-1/12 left-full p-3.5 focus:outline-none" // Bỏ thuộc tính hover
                            style={{ cursor: 'default' }} // Đặt con trỏ chuột thành mặc định
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition text-2xl"
                >
                    Cập nhật thông tin
                </button>
            </form>
        </div>
    );
};

export default UserInfo;