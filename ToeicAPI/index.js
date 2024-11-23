const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./db/dbconfig');

// Import các route
const topicsRoutes = require('./routes/topics');
const vocabularyRoutes = require('./routes/vocabulary');
const questionsRoutes = require('./routes/questions');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối CSDL
sql.connect(config)
    .then(() => console.log('Kết nối thành công đến SQL Server'))
    .catch(err => console.error('Kết nối thất bại:', err));

// Sử dụng các route
app.use('/api/topics', topicsRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/questions', questionsRoutes);

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
