import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminHome = () => {
  const styles = {
    adminContainer: {
      display: 'flex',
      height: '100vh',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#1E40AF', // Màu xanh lam giống như trang chủ
      color: 'white',
      padding: '20px',
      height: '100%',
      boxSizing: 'border-box',
    },
    sidebarTitle: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '30px',
      color: '#ffffff', // Chữ màu trắng
    },
    sidebarList: {
      listStyle: 'none',
      padding: '0',
    },
    sidebarListItem: {
      margin: '20px 0',
    },
    sidebarLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '18px',
      display: 'block',
      padding: '10px',
      transition: 'background-color 0.3s',
    },
    sidebarLinkHover: {
      backgroundColor: '#3B82F6', // Màu xanh sáng khi hover
    },
    
    
  };

  return (
    <div style={styles.adminContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin Page</h2>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarListItem}>
            <Link to="/admin/topics" style={styles.sidebarLink}>Topics</Link>
          </li>
          <li style={styles.sidebarListItem}>
            <Link to="/admin/vocabulary" style={styles.sidebarLink}>Vocabulary</Link>
          </li>
          <li style={styles.sidebarListItem}>
            <Link to="/admin/lesson" style={styles.sidebarLink}>Lessons</Link>
          </li>
          <li style={styles.sidebarListItem}>
            <Link to="/admin/exams" style={styles.sidebarLink}>Exams</Link> 
          </li>
          <li style={styles.sidebarListItem}>
          
          </li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Nội dung các route con sẽ được hiển thị ở đây */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHome;
