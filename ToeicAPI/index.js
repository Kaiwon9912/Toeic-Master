const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./dbconfig');

// Import các route
const topicsRoutes = require('./routes/topic');
const vocabularyRoutes = require('./routes/vocabulary');
const questionsRoutes = require('./routes/questions');
const partsRoutes = require('./routes/parts');
const examsRoutes = require('./routes/exams');
const userRoutes = require('./routes/users');
const lessonRoutes = require('./routes/lessons');
const examResult = require('./routes/examResult');
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
app.use('/api/topic', topicsRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/parts', partsRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/results', examResult);


// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
