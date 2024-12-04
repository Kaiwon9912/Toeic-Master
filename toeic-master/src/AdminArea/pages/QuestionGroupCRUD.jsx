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

  // Fetch Question Groups with Pagination
  const fetchQuestionGroups = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/questions/group/paging?page=${page}&pageSize=10`, {
      });
      const { data, totalPages } = response.data;
      setQuestionGroups(data);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching question groups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionGroups();
  }, []);

  // Delete Question Group
  const deleteQuestionGroup = async (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        await axios.delete(`http://localhost:3000/api/questions/group/delete/${id}`);
        fetchQuestionGroups(currentPage);
      } catch (error) {
        console.error('Error deleting question group:', error);
      }
    }
  };

  // Open Modal
  const handleOpenModal = (group = null) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGroup(null);
    fetchQuestionGroups(currentPage);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Question Group Management</h1>
      <button
        onClick={() => handleOpenModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Question Group
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Audio</th>
                <th className="border px-4 py-2">Content</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionGroups.map((group) => (
                <tr key={group.QuestionGroupID}>
                  <td className="border px-4 py-2">{group.QuestionGroupID}</td>
                  <td className="border px-4 py-2">{group.Audio || 'No Audio'}</td>
                  <td className="border px-4 py-2">
                    {group.Content.length > 50
                      ? `${group.Content.substring(0, 50)}...`
                      : group.Content}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleOpenModal(group)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuestionGroup(group.QuestionGroupID)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => fetchQuestionGroups(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => fetchQuestionGroups(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Next
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
