import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const topicsPerPage = 5;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [newTopic, setNewTopic] = useState({ Name: '', Image: '' });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/topics');
        setTopics(response.data);
        setTotalPages(Math.ceil(response.data.length / topicsPerPage));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setTimeout(() => setError(null), 5000);
      }
    };

    fetchTopics();
  }, []);

  const handleDelete = async () => {
    if (topicToDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/topics/${topicToDelete.TopicID}`);
        setTopics(prevTopics => prevTopics.filter((topic) => topic.TopicID !== topicToDelete.TopicID));
        setDeleteSuccess('Topic deleted successfully!');
        setTimeout(() => setDeleteSuccess(''), 3000);
        setIsDeleteModalOpen(false);
      } catch (err) {
        setError(`Error deleting topic: ${err.response ? err.response.data : err.message}`);
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  const openDeleteModal = (topic) => {
    setTopicToDelete(topic);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateTopic = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/topics/${editingTopic.TopicID}`, editingTopic);
      setTopics(topics.map(topic => topic.TopicID === editingTopic.TopicID ? response.data : topic));
      setEditingTopic(null);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTopic) {
      setEditingTopic({ ...editingTopic, [name]: value });
    } else {
      setNewTopic({ ...newTopic, [name]: value });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    const nextID = `TP${String(topics.length + 1).padStart(2, '0')}`;
    setNewTopic({ TopicID: nextID, Name: '', Image: '' });
  };

  const handleAddTopic = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/topics', newTopic);
      setTopics([...topics, response.data]);
      setIsAddModalOpen(false);
      setNewTopic({ Name: '', Image: '' });
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const openEditModal = (topic) => {
    setEditingTopic(topic);
  };

  const currentTopics = topics.slice((currentPage - 1) * topicsPerPage, currentPage * topicsPerPage);

  const isImageValid = (imageUrl) => {
    return imageUrl && imageUrl.startsWith('http');
  };

  if (loading) return <p className="text-center text-lg text-blue-800 py-12">Loading topics...</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg ">
      {/* Thông báo lỗi pop-up */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out">
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-blue-800">Topics Management</h1>
        <button className="w-[10%] p-2 bg-blue-800 text-white rounded ml-auto" onClick={openAddModal}>Add Topic</button>
      </div>

      {deleteSuccess && <p className="text-green-500 font-bold">{deleteSuccess}</p>}

      {/* Modal for Adding Topic */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/2 flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl mb-4">Add New Topic</h2>
              <div className="flex mb-4">
                <div className="w-1/3 pr-2">
                  <label className="block mb-1 text-left">Topic ID</label>
                  <input
                    type="text"
                    name="TopicID"
                    value={newTopic.TopicID}
                    readOnly
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="w-2/3 pl-2">
                  <label className="block mb-1 text-left">Name</label>
                  <input
                    type="text"
                    name="Name"
                    placeholder="Topic Name"
                    value={newTopic.Name}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-left">Image</label>
                <input
                  type="text"
                  name="Image"
                  placeholder="Image Filename"
                  value={newTopic.Image}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex justify-end">
                <button onClick={handleAddTopic} className="p-2 bg-blue-800 text-white rounded">Add Topic</button>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 bg-gray-400 text-white rounded ml-2">Cancel</button>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              {isImageValid(newTopic.Image) ? (
                <img
                  src={newTopic.Image}
                  alt="Preview"
                  className="h-full object-cover border border-gray-300 rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center border border-gray-300 rounded">
                  <p className="text-gray-400">No Image Available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Modal for Confirming Delete */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the topic
              <span className="text-red-500"> "{topicToDelete?.Name}" </span>
              ?
            </p>
            <div className="flex justify-end mt-4">
              <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">Delete</button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="p-2 bg-gray-400 text-white rounded ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Topic */}
      {editingTopic && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/2 flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl mb-4">Edit Topic</h2>
              <div className="flex mb-4">
                <div className="w-1/3 pr-2">
                  <label className="block mb-1 text-left">Topic ID</label>
                  <input
                    type="text"
                    name="TopicID"
                    value={editingTopic.TopicID}
                    readOnly
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="w-2/3 pl-2">
                  <label className="block mb-1 text-left">Name</label>
                  <input
                    type="text"
                    name="Name"
                    value={editingTopic.Name}
                    onChange={(e) => handleInputChange(e)}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-left">Image</label>
                <input
                  type="text"
                  name="Image"
                  value={editingTopic.Image}
                  onChange={(e) => handleInputChange(e)}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex justify-end">
                <button onClick={handleUpdateTopic} className="p-2 bg-blue-800 text-white rounded">Update Topic</button>
                <button onClick={() => setEditingTopic(null)} className="p-2 bg-gray-400 text-white rounded ml-2">Cancel</button>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              {isImageValid(editingTopic.Image) ? (
                <img
                  src={editingTopic.Image}
                  alt="Preview"
                  className="h-full object-cover border border-gray-300 rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center border border-gray-300 rounded">
                  <p className="text-gray-400">No Image Available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 text-center bg-blue-800 text-white">ID</th>
            <th className="border border-gray-300 p-3 text-center bg-blue-800 text-white">Name</th>
            <th className="border border-gray-300 p-3 text-center bg-blue-800 text-white">Image</th>
            <th className="border border-gray-300 p-3 text-center bg-blue-800 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTopics.map((topic) => (
            <tr key={topic.TopicID}>
              <td className="border border-gray-300 p-3 text-center">{topic.TopicID}</td>
              <td className="border border-gray-300 p-3 text-center">{topic.Name}</td>
              <td className="border border-gray-300 p-3 text-center">
                <div className="max-w-[100px] mx-auto overflow-hidden">
                  <img
                    src={topic.Image}
                    alt={topic.Name}
                    className="w-full h-auto"
                  />
                </div>
              </td>
              <td className="border border-gray-300 p-3 text-center">
                <div className="flex justify-center">
                  <button onClick={() => openEditModal(topic)} className="p-1 bg-green-500 text-white rounded">Edit</button>
                  <button onClick={() => openDeleteModal(topic)} className="p-1 bg-red-500 text-white rounded ml-2">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

    </div>
  );
};

export default Topics;