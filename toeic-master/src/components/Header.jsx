import React from 'react';
import { useUser } from '../hooks/UserContext'; // Import useUser

const Header = () => {
  const { user } = useUser(); // Lấy thông tin người dùng từ context

  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">TOEIC MASTER</a>
        <nav className="space-x-6">
          <a href="#mock-test" className="hover:text-yellow-300">Thi thử</a>
          <a href="#lessons" className="hover:text-yellow-300">Bài học</a>
          <a href="#vocabulary" className="hover:text-yellow-300">Từ vựng</a>
          {user ? (
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-3xl font-semibold">{user.Username}</span>
          ) : (
            <a href="#login" className="bg-yellow-400 text-black px-4 py-2 rounded-3xl font-semibold">Đăng nhập</a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;