const config = {
  user: 'sa',
  password: '123456',
  server: 'DESKTOP-S7I5A9E', // có thể là 'localhost' hoặc địa chỉ IP
  database: 'ToeicData',
  options: {

    trustServerCertificate: true // Nếu kết nối cục bộ, để true
  }
};

module.exports = config;
