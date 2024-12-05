import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalQuestionGroup from '../components/ModalQuestionGroup';

const QuestionGroupCRUD = () => {
  const [questionGroups, setQuestionGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Lấy danh sách nhóm câu hỏi với phân trang
  const fetchQuestionGroups = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/questions/group/paging?page=${page}&pageSize=10`);
      const { data, totalPages } = response.data;
      setQuestionGroups(data);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Lỗi khi lấy nhóm câu hỏi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionGroups();
  }, []);

  // Xóa nhóm câu hỏi
  const deleteQuestionGroup = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhóm này không?')) {
      try {
        await axios.delete(`http://localhost:3000/api/questions/group/delete/${id}`);
        fetchQuestionGroups(currentPage);
      } catch (error) {
        console.error('Lỗi khi xóa nhóm câu hỏi:', error);
      }
    }
  };

  // Mở Modal
  const handleOpenModal = (group = null) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  // Đóng Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGroup(null);
    fetchQuestionGroups(currentPage);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý nhóm câu hỏi</h1>
      <button
        onClick={() => handleOpenModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Thêm nhóm mới
      </button>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          <div className="max-h-full overflow-y-auto">
            <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white min-w-[150px]">ID</th>
                  <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white min-w-[200px]">Audio</th>
                  <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white min-w-[200px]">Nội Dung</th>
                  <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white min-w-[150px]">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {questionGroups.map((group) => (
                  <tr key={group.QuestionGroupID}>
                    <td className="py-3 text-center border-b border-gray-300">{group.QuestionGroupID || 'N/A'}</td>
                    <td className="py-3 text-center border-b border-gray-300">{group.Audio || 'Không có audio'}</td>
                    <td className="py-3 text-center border-b border-gray-300">
                      {group.Content && typeof group.Content === 'string' && group.Content.length > 50
                        ? `${group.Content.substring(0, 50)}...`
                        : group.Content ? group.Content : 'Không có nội dung'}
                    </td>
                    <td className="py-3 text-center border-b border-gray-300">
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-4" onClick={() => handleOpenModal(group)}>Sửa</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteQuestionGroup(group.QuestionGroupID)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Các điều khiển phân trang */}
          <div className="flex justify-center mt-4 w-1/2 mx-auto">
            <button
              className={`p-2 bg-blue-800 text-white rounded-l-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
              onClick={() => fetchQuestionGroups(1)}
              disabled={currentPage === 1}
            >
              Đầu
            </button>
            <button
              className={`p-2 bg-blue-800 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
              onClick={() => fetchQuestionGroups(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            <span className="flex items-center px-4 whitespace-nowrap">
              Trang {currentPage} của {totalPages}
            </span>
            <button
              className={`p-2 bg-blue-800 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
              onClick={() => fetchQuestionGroups(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Tiếp
            </button>
            <button
              className={`p-2 bg-blue-800 text-white rounded-r-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
              onClick={() => fetchQuestionGroups(totalPages)}
              disabled={currentPage === totalPages}
            >
              Cuối
            </button>
          </div>
        </>
      )}
      {showModal && (
        <ModalQuestionGroup
          group={selectedGroup}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default QuestionGroupCRUD;