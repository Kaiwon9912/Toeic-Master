import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vocabulary = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [wordToDelete, setWordToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [wordInfo, setWordInfo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editWord, setEditWord] = useState({ Word: '', Translation: '', TopicID: '' });
  const [topics, setTopics] = useState([]); // State for topics
  const [totalPages, setTotalPages] = useState(0); // State for total pages of topics
  const topicsPerPage = 15; // Adjust as needed

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/vocabulary');
        setVocabulary(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/topics');
        setTopics(response.data);
        setTotalPages(Math.ceil(response.data.length / topicsPerPage));
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(null), 5000);
      }
    };

    fetchVocabulary();
    fetchTopics();
  }, []);

  const handleDeleteClick = (word) => {
    setWordToDelete(word);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setVocabulary(vocabulary.filter((item) => item.Word !== wordToDelete.Word));
    setSuccessMessage(`Deleted successfully: "${wordToDelete.Word}"`);
    setIsDeleteModalOpen(false);
    setWordToDelete(null);

    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setWordToDelete(null);
  };

  const handleShowInfo = async (word) => {
    setIsInfoModalOpen(true);
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.Word}`);
      const apiData = response.data[0];

      const structuredWordInfo = {
        word: apiData.word,
        phonetic: apiData.phonetic,
        pronunciations: apiData.phonetics.map(pronunciation => ({
          text: pronunciation.text,
          audio: pronunciation.audio
        })),
        meanings: apiData.meanings.map(meaning => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map(definition => ({
            definition: definition.definition,
            synonyms: definition.synonyms,
            antonyms: definition.antonyms,
            example: definition.example
          })),
        }))
      };

      setWordInfo(structuredWordInfo);
    } catch (error) {
      setWordInfo(null);
    }
  };

  const handleCloseInfo = () => {
    setIsInfoModalOpen(false);
    setWordInfo(null);
  };

  const handleEditClick = (word) => {
    setEditWord(word); // Set the word to edit
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditWord({ ...editWord, [name]: value });
  };

  const handleEditSubmit = () => {
    setVocabulary(vocabulary.map(item => item.Word === editWord.Word ? editWord : item));
    setSuccessMessage(`Edited successfully: "${editWord.Word}"`);
    setIsEditModalOpen(false);
    setEditWord({ Word: '', Translation: '', TopicID: '' });

    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  if (loading) return <div className="text-center text-lg text-blue-800 py-12">Đang tải từ vựng...</div>;
  if (error) return <div className="text-center text-lg text-red-600 py-12">Lỗi khi tải từ vựng: {error}</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vocabulary.slice(indexOfFirstItem, indexOfLastItem);
  const totalPagesVocabulary = Math.ceil(vocabulary.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPagesVocabulary) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg ">
      <h1 className="text-center text-3xl text-blue-800 mb-5">Vocabulary list</h1>
      {successMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-md">
          {successMessage}
        </div>
      )}
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">Word</th>
            <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white">Translation</th>
            <th className="py-3 text-center border-b border-gray-300 bg-blue-800 text-white" style={{ width: '30%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((word, index) => (
            <tr key={index}>
              <td className="py-3 text-center border-b border-gray-300">{word.Word}</td>
              <td className="py-3 text-center border-b border-gray-300">{word.Translation}</td>
              <td className="py-3 text-center border-b border-gray-300">
                <div className="flex justify-center space-x-2">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                    onClick={() => handleEditClick(word)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    onClick={() => handleDeleteClick(word)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                    onClick={() => handleShowInfo(word)}
                  >
                    Information
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Confirming Delete */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the word
              <span className="text-red-500"> "{wordToDelete?.Word}" </span>
              ?
            </p>
            <div className="flex justify-end mt-4">
              <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">Delete</button>
              <button onClick={handleCancelDelete} className="p-2 bg-gray-400 text-white rounded ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Showing Word Information */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-xl mb-4">Word Information</h2>
              <button onClick={handleCloseInfo} className="text-gray-600 hover:text-gray-900 w-1/12" style={{ flex: '0 0 3%' }} aria-label="Close">X</button>
            </div>
            {wordInfo && (
              <>
                <p><strong>Word:</strong> {wordInfo.word}</p>
                {wordInfo.pronunciations && wordInfo.pronunciations.length > 0 && wordInfo.pronunciations.map((phonetic, index) => (
                  <div key={index}>
                    <p><strong>Phonetic:</strong> {phonetic.text}</p>
                    {phonetic.audio && <audio controls src={phonetic.audio}></audio>}
                  </div>
                ))}
                {wordInfo.meanings && wordInfo.meanings.map((meaning, index) => (
                  <div key={index}>
                    <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
                    <p><strong>Definitions:</strong></p>
                    <ul>
                      {meaning.definitions.map((def, i) => (
                        <li key={i}>
                          {def.definition} {def.example && (
                            <div style={{ marginTop: '5px' }}>
                              <strong>Example:</strong>
                              <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                                <li>{def.example}</li>
                              </ul>
                            </div>
                          )}
                          {def.synonyms.length > 0 && (
                            <div className="mt-2">
                              <strong style={{ color: 'blue' }}>Synonyms:</strong>
                              <ul>
                                {def.synonyms.map((synonym, j) => (
                                  <li key={j}>
                                    <span role="img" aria-label="synonym">🔗</span> {synonym}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {def.antonyms.length > 0 && (
                            <div className="mt-2">
                              <strong style={{ color: 'red' }}>Antonyms:</strong>
                              <ul>
                                {def.antonyms.map((antonym, j) => (
                                  <li key={j}>
                                    <span role="img" aria-label="antonym">❌</span> {antonym}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {wordInfo.otherInfo && (
                  <div>
                    <strong>Other Information:</strong>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal for Editing Word */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Edit Word</h2>
            <input
              type="text"
              name="Word"
              value={editWord.Word}
              onChange={handleEditChange}
              placeholder="Word"
              className="border border-gray-300 p-2 rounded w-full mb-3"
            />
            <input
              type="text"
              name="Translation"
              value={editWord.Translation}
              onChange={handleEditChange}
              placeholder="Translation"
              className="border border-gray-300 p-2 rounded w-full mb-3"
            />
            <select
              name="TopicID"
              value={editWord.TopicID} // Set the current TopicID
              onChange={handleEditChange}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            >
              <option value="">Select Topic</option>
              {topics.map((topic) => (
                <option key={topic.TopicID} value={topic.TopicID}>
                  {topic.Name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button onClick={handleEditSubmit} className="p-2 bg-blue-500 text-white rounded">Save</button>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 bg-gray-400 text-white rounded ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

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
          Page {currentPage} of {totalPagesVocabulary}
        </span>
        <button
          className={`p-2 bg-blue-800 text-white ${currentPage === totalPagesVocabulary ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
          onClick={handleNextPage}
          disabled={currentPage === totalPagesVocabulary}
        >
          Next
        </button>
        <button
          className={`p-2 bg-blue-800 text-white rounded-r-lg ${currentPage === totalPagesVocabulary ? 'opacity-50 cursor-not-allowed' : ''} mx-2`}
          onClick={() => setCurrentPage(totalPagesVocabulary)}
          disabled={currentPage === totalPagesVocabulary}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Vocabulary;