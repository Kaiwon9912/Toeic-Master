import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vocabulary = () => {
  const [vocabulary, setVocabulary] = useState([]); // State để lưu danh sách từ vựng
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State để quản lý lỗi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10; // Số lượng từ vựng hiển thị mỗi trang

  useEffect(() => {
    // Hàm lấy dữ liệu từ API
    const fetchVocabulary = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/vocabulary'); // Gọi API lấy từ vựng
        setVocabulary(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Đánh dấu việc tải dữ liệu đã hoàn tất
      } catch (err) {
        setError(err.message); // Nếu có lỗi, lưu thông tin lỗi
        setLoading(false);
      }
    };

    fetchVocabulary();
  }, []); // Chỉ chạy 1 lần khi component được render

  if (loading) return <div style={styles.loading}>Đang tải từ vựng...</div>; // Hiển thị khi dữ liệu đang được tải
  if (error) return <div style={styles.error}>Lỗi khi tải từ vựng: {error}</div>; // Hiển thị khi có lỗi

  // Cắt dữ liệu để hiển thị theo trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vocabulary.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vocabulary.length / itemsPerPage);

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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vocabulary list</h1>
      
      {/* Bảng hiển thị danh sách từ vựng */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Word</th>
            <th style={styles.th}>Translation</th>
            <th style={styles.th}>TopicID</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((word, index) => (
            <tr key={index}>
              <td style={styles.td}>{word.Word}</td>
              <td style={styles.td}>{word.Translation}</td>
              <td style={styles.td}>{word.TopicID}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút chuyển trang */}
      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &lt;&lt; {/* Nút Previous với ký tự <> */}
        </button>
        <span style={styles.pageNumber}>Page {currentPage} / {totalPages}</span>
        <button
          style={styles.paginationButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;&gt; {/* Nút Next với ký tự <> */}
        </button>
      </div>
    </div>
  );
};

// Các styles sử dụng inline style
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
    color: '#1e40af', // Màu xanh lam đậm
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
    textAlign: 'center', // Canh giữa tiêu đề
    borderBottom: '1px solid #ddd',
    backgroundColor: '#1e40af', // Màu nền cho tiêu đề bảng
    color: 'white',
  },
  td: {
    padding: '12px',
    textAlign: 'center', // Canh giữa nội dung của các ô
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
  pagination: {
    textAlign: 'center',
    marginTop: '20px',
  },
  paginationButton: {
    fontSize: '18px',
    padding: '10px 15px',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 10px',
  },
  pageNumber: {
    fontSize: '18px',
    color: '#1e40af',
  },
};

export default Vocabulary;
