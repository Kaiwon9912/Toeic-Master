import React, { useState } from 'react';
import axios from 'axios';

const ModalQuestionGroup = ({ group, onClose }) => {
  const [formData, setFormData] = useState({
    questionGroupId: group?.QuestionGroupID || '',
    audio: group?.Audio || '',
    content: group?.Content || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (group) {
        // Update
        await axios.put(`http://localhost:3000/api/questions/group/update/${group.QuestionGroupID}`, formData);
      } else {
        // Create
        await axios.post('http://localhost:3000/api/questions/group/create/', formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving question group:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {group ? 'Edit Question Group' : 'Add Question Group'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Question Group ID</label>
            <input
              type="text"
              name="questionGroupId"
              value={formData.questionGroupId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              disabled={!!group}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Audio</label>
            <input
              type="text"
              name="audio"
              value={formData.audio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalQuestionGroup;
