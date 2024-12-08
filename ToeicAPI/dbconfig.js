const config = {
  user: 'sa',
  password: '123',
  server: 'DESKTOP-KVMLTGB', // có thể là 'DESKTOP-KVMLTGB' hoặc 'MSI'
  database: 'ToeicData',
  options: {

    trustServerCertificate: true // Nếu kết nối cục bộ, để true
  }
};

module.exports = config;
