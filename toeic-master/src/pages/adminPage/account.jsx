import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State để lưu giá trị tìm kiếm

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users'); // Địa chỉ API để lấy dữ liệu
        setUsers(response.data); // Giả sử API trả về danh sách người dùng
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const resetPassword = async (userId) => {
    try {
      await axios.post(`http://localhost:3000/api/users/reset-password/${userId}`, { newPassword: '1' });
      alert('Mật khẩu đã được reset thành công thành "1"!');
    } catch (error) {
      alert('Lỗi khi reset mật khẩu: ' + error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      setUsers(users.filter(user => user.Username !== userId)); // Cập nhật danh sách người dùng
      alert('Người dùng đã được xóa!');
    } catch (error) {
      alert('Lỗi khi xóa người dùng: ' + error.message);
    }
  };

  // Hàm lọc người dùng theo tên
  const filteredUsers = users.filter(user =>
    user.FullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi khi tải dữ liệu: {error}</div>;

  return (
    <div>
      <h1 className="text-center text-2xl mb-4">Quản lý người dùng</h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex justify-start">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..." // Placeholder bằng tiếng Việt
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
          className="border rounded px-2 py-1 w-2/5" // Chiếm 40% chiều ngang
        />
      </div>

      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 text-center border-b border-gray-300">Tên đăng nhập</th>
            <th className="py-3 text-center border-b border-gray-300">Họ và tên</th>
            <th className="py-3 text-center border-b border-gray-300">Email</th>
            <th className="py-3 text-center border-b border-gray-300">Vai trò</th>
            <th className="py-3 text-center border-b border-gray-300">Hành động</th> {/* Cột Hành động */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.Username}>
              <td className="py-3 text-center border-b border-gray-300">{user.Username}</td>
              <td className="py-3 text-center border-b border-gray-300">{user.FullName}</td>
              <td className="py-3 text-center border-b border-gray-300">{user.Email}</td>
              <td className="py-3 text-center border-b border-gray-300">{user.Role === 0 ? 'User' : 'Admin'}</td>
              <td className="py-3 text-center border-b border-gray-300">
                <div className="flex justify-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => resetPassword(user.Username)} // Gọi hàm resetPassword
                  >
                    Reset Password
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteUser(user.Username)} // Gọi hàm deleteUser
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Account;