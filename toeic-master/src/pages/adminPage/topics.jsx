import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTopic, setNewTopic] = useState({ Name: '', Image: '' });
  const [editingTopic, setEditingTopic] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const topicsPerPage = 5;

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
      }
    };

    fetchTopics();
  }, []);

  const handleDelete = async (topicID) => {
    try {
      await axios.delete(`http://localhost:3000/api/topics/${topicID}`);
      setTopics(prevTopics => prevTopics.filter((topic) => topic.TopicID !== topicID));
      setDeleteSuccess('Topic deleted successfully!');
      setTimeout(() => setDeleteSuccess(''), 3000);
    } catch (err) {
      setError(`Error deleting topic: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleAddTopic = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/topics', newTopic);
      setTopics([...topics, response.data]);
      setNewTopic({ Name: '', Image: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTopic = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/topics/${editingTopic.TopicID}`, editingTopic);
      setTopics(topics.map(topic => topic.TopicID === editingTopic.TopicID ? response.data : topic));
      setEditingTopic(null);
    } catch (err) {
      setError(err.message);
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

  const currentTopics = topics.slice((currentPage - 1) * topicsPerPage, currentPage * topicsPerPage);

  if (loading) return <p style={styles.loading}>Loading topics...</p>;
  if (error) return <p style={styles.error}>Error loading topics: {error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Topics Page</h1>

      {deleteSuccess && <p style={{ color: 'green', fontWeight: 'bold' }}>{deleteSuccess}</p>}

      <div>
        <h2>Add New Topic</h2>
        <input
          type="text"
          name="Name"
          placeholder="Topic Name"
          value={newTopic.Name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="Image"
          placeholder="Image Filename"
          value={newTopic.Image}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button onClick={handleAddTopic} style={styles.button}>Add Topic</button>
      </div>

      {editingTopic && (
        <div>
          <h2>Edit Topic</h2>
          <input
            type="text"
            name="Name"
            placeholder="Topic Name"
            value={editingTopic.Name}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="Image"
            placeholder="Image Filename"
            value={editingTopic.Image}
            onChange={handleInputChange}
            style={styles.input}
          />
          <button onClick={handleUpdateTopic} style={styles.button}>Update Topic</button>
          <button onClick={() => setEditingTopic(null)} style={styles.button}>Cancel</button>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTopics.map((topic) => (
            <tr key={topic.TopicID}>
              <td style={styles.td}>{topic.TopicID}</td>
              <td style={styles.td}>{topic.Name}</td>
              <td style={styles.td}>
                <div style={styles.imageContainer}>
                  <img
                    src={`http://localhost:3000/images/${topic.Image}`}
                    alt={topic.Name}
                    style={styles.image}
                  />
                </div>
              </td>
              <td style={styles.td}>
                <button onClick={() => setEditingTopic(topic)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(topic.TopicID)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &lt;&lt; {/* Previous button */}
        </button>
        <span style={styles.pageNumber}>Page {currentPage} / {totalPages}</span>
        <button
          style={styles.paginationButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;&gt; {/* Next button */}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#1e40af',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  th: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#1e40af',
    color: 'white',
  },
  td: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#1e40af',
    padding: '50px 0',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
    padding: '50px 0',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px 0',
  },
  editButton: {
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
  },
  imageContainer: {
    maxWidth: '100px',
    maxHeight: '100px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  paginationButton: {
    padding: '10px',
    margin: '0 10px',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  pageNumber: {
    fontSize: '18px',
    alignSelf: 'center',
  },
};

export default Topics;
