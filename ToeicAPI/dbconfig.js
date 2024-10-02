// dbConfig.js
const config = {
    user: 'sa', // Thay thế bằng tên người dùng của bạn
    password: '123456', // Thay thế bằng mật khẩu của bạn
    server: 'MSI', // Tên server
    database: 'ToeicData',
    options: {
        encrypt: true, // Sử dụng nếu bạn kết nối qua SSL
        trustServerCertificate: true, // Chỉ sử dụng cho môi trường phát triển
    },
};

module.exports = config;
