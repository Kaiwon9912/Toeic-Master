import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Trang Lesson
const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [parts, setParts] = useState([]); // State để lưu danh sách Parts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLesson, setCurrentLesson] = useState({ Title: '', Content: '', QuestionType: '', Guide: '', PartID: '' });

  const fetchLessons = async () => {
    setLoading(true); // Đặt loading thành true trước khi gọi API
    try {
      const response = await axios.get('http://localhost:3000/api/lessons');
      setLessons(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Đặt loading thành false sau khi gọi API xong
    }
  };

  const fetchParts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/parts');
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error.message);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchParts(); // Gọi hàm để lấy dữ liệu Parts
  }, []);

  if (loading) return <div className="text-center text-2xl text-blue-800 py-12">Đang tải bài học...</div>;
  if (error) return <div className="text-center text-2xl text-red-600 py-12">Lỗi khi tải bài học: {error}</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lessons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(lessons.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (lesson = null) => {
    if (lesson) {
      setCurrentLesson(lesson);
      setIsEditMode(true);
    } else {
      setCurrentLesson({ Title: '', Content: '', QuestionType: '', Guide: '', PartID: '' });
      setIsEditMode(false);
    }
    setIsModalOpen(true);
  };

  const saveLesson = async () => {
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:3000/api/lessons/${currentLesson.LessonID}`, currentLesson);
      } else {
        await axios.post('http://localhost:3000/api/lessons', currentLesson);
      }
      // Gọi lại API để lấy dữ liệu mới
      fetchLessons();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Lỗi khi lưu bài học:', error.message);
    }
  };

  const deleteLesson = async (lessonId) => {
    try {
      await axios.delete(`http://localhost:3000/api/lessons/${lessonId}`);
      // Gọi lại API để lấy dữ liệu mới
      fetchLessons();
    } catch (error) {
      console.error('Lỗi khi xóa bài học:', error.message);
    }
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg max-w-full overflow-hidden relative">
      <h1 className="text-center text-4xl text-blue-800 mb-5">List of lessons</h1>

      <div className="absolute top-5 right-5">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => openModal()}>
          Add New Lesson
        </button>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">ID</th>
              <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">Title</th>
              <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">Content</th>
              <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">Question type</th>
              <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">Instructions</th>
              <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">Part of Lesson</th>
              <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((lesson, index) => (
              <tr key={index}>
                <td className="py-3 text-center border-b border-gray-300">{lesson.LessonID}</td>
                <td className="py-3 text-center border-b border-gray-300">{lesson.Title}</td>
                <td className="py-3 text-center border-b border-gray-300">{lesson.Content}</td>
                <td className="py-3 text-center border-b border-gray-300">{lesson.QuestionType}</td>
                <td className="py-3 text-center border-b border-gray-300">{lesson.Guide}</td>
                <td className="py-3 text-center border-b border-gray-300">{lesson.PartID}</td>
                <td className="py-3 text-center border-b border-gray-300">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => openModal(lesson)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteLesson(lesson.LessonID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 w-1/2 mx-auto">
        <button
          className={`p-2 bg-blue-800 text-white rounded-l-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className={`p-2 bg-blue-800 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="flex items-center px-4 whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`p-2 bg-blue-800 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className={`p-2 bg-blue-800 text-white rounded-r-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">{isEditMode ? 'Edit Lesson' : 'Add New Lesson'}</h2>
            <select
              value={currentLesson.PartID}
              onChange={e => setCurrentLesson({ ...currentLesson, PartID: e.target.value })}
              className="border border-gray-300 p-2 mb-3 w-full rounded"
            >
              <option value="">Select Part</option>
              {parts.map(part => (
                <option key={part.PartID} value={part.PartID}>{part.Title}</option> // Sử dụng Title cho dropdown
              ))}
            </select>
            <input
              type="text"
              placeholder="Title"
              value={currentLesson.Title}
              onChange={e => setCurrentLesson({ ...currentLesson, Title: e.target.value })}
              className="border border-gray-300 p-2 mb-3 w-full rounded"
            />
            <textarea
              placeholder="Content"
              value={currentLesson.Content}
              onChange={e => setCurrentLesson({ ...currentLesson, Content: e.target.value })}
              className="border border-gray-300 p-2 mb-3 w-full rounded h-24"
            />
            <input
              type="text"
              placeholder="Question Type"
              value={currentLesson.QuestionType}
              onChange={e => setCurrentLesson({ ...currentLesson, QuestionType: e.target.value })}
              className="border border-gray-300 p-2 mb-3 w-full rounded"
            />
            <textarea
              placeholder="Instructions"
              value={currentLesson.Guide}
              onChange={e => setCurrentLesson({ ...currentLesson, Guide: e.target.value })}
              className="border border-gray-300 p-2 mb-3 w-full rounded h-24"
            />
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={saveLesson}>
                {isEditMode ? 'Update' : 'Add'}
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;