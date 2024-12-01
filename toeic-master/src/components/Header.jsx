import React, { useState } from 'react';
import { useUser } from '../hooks/UserContext'; // Import useUser
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const { user, logout } = useUser(); // Lấy thông tin người dùng và hàm logout từ context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State để quản lý menu
  const navigate = useNavigate(); // Hook để điều hướng

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout(); // Gọi hàm logout để xóa thông tin người dùng
    navigate('/#/'); // Chuyển hướng về trang chính
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <a href="/#/" className="text-2xl font-bold">TOEIC MASTER</a>
        <nav className="flex items-center space-x-6 relative">
          <a href="#mock-test" className="hover:text-yellow-300">Mock Test</a>
          <a href="#lessons" className="hover:text-yellow-300">Lessons</a>
          <a href="#vocabulary" className="hover:text-yellow-300">Vocabulary</a>
          {user ? (
            <div className="relative w-1/2">
              <button
                onClick={toggleMenu}
                className="bg-yellow-400 text-black px-4 py-2 rounded-3xl font-semibold "
              >
                {user.fullName}
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-30 bg-white text-black rounded-lg shadow-lg z-10">
                  <a href="#user-info" className="block px-4 py-2 text-right hover:bg-gray-200">User Info</a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="#login" className="bg-yellow-400 text-black px-4 py-2 rounded-3xl font-semibold">Login</a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;