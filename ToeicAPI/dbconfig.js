const config = {
    user: 'sa',
    password: '123',
    server: 'MSI', // có thể là 'localhost' hoặc địa chỉ IP
    database: 'ToeicData',
    options: {
     
      trustServerCertificate: true // Nếu kết nối cục bộ, để true
    }
  };
  
  module.exports = config;
  