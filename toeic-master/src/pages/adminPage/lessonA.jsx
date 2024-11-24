import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Trang Lesson
const Lessons = () => {
  const [lessons, setLessons] = useState([]); // State để lưu danh sách bài học
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State để quản lý lỗi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 4; // Số lượng bài học hiển thị mỗi trang

  useEffect(() => {
    // Hàm lấy dữ liệu từ API
    const fetchLessons = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/lessons'); // Gọi API lấy bài học
        setLessons(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Đánh dấu việc tải dữ liệu đã hoàn tất
      } catch (err) {
        setError(err.message); // Nếu có lỗi, lưu thông tin lỗi
        setLoading(false);
      }
    };

    fetchLessons();
  }, []); // Chỉ chạy 1 lần khi component được render

  if (loading) return <div style={styles.loading}>Đang tải bài học...</div>; // Hiển thị khi dữ liệu đang được tải
  if (error) return <div style={styles.error}>Lỗi khi tải bài học: {error}</div>; // Hiển thị khi có lỗi

  // Cắt dữ liệu để hiển thị theo trang
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>List of lessons</h1>

      {/* Bảng hiển thị danh sách bài học */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Content</th>
              <th style={styles.th}>Question type</th>
              <th style={styles.th}>Instructions</th>
              <th style={styles.th}>Part of Lesson</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((lesson, index) => (
              <tr key={index}>
                <td style={styles.td}>{lesson.Title}</td>
                <td style={styles.td}>{lesson.Content}</td>
                <td style={styles.td}>{lesson.QuestionType}</td>
                <td style={styles.td}>{lesson.Guide}</td>
                <td style={styles.td}>{lesson.PartID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    maxWidth: '100%', // Đảm bảo container luôn đầy đủ không gian ngang
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#1e40af', // Màu xanh lam đậm
    marginBottom: '20px',
  },
  tableWrapper: {
    maxHeight: '500px', // Giới hạn chiều cao của bảng
    overflowY: 'auto',  // Thêm thanh cuộn dọc nếu bảng vượt quá chiều cao
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

export default Lessons;
