const sql = require('mssql');

// Lấy danh sách câu hỏi theo phần
exports.getRandomQuestionByPart = async (req, res) => {
    const { part, examQuestion } = req.params;  // Lấy cả part và examQuestion từ tham số URL
    try {
        const pool = await sql.connect();
        
        // Truy vấn câu hỏi ngẫu nhiên với PartID và ExamQuestion
        const result = await pool.request()
            .input('part', sql.Int, part)  // Nhận tham số part từ URL
            .input('examQuestion', sql.Int, examQuestion)  // Nhận tham số examQuestion từ URL
            .query('SELECT TOP 1 * FROM Questions WHERE PartID = @part AND ExamQuestion = @examQuestion ORDER BY NEWID()'); // Lấy ngẫu nhiên 1 câu hỏi

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Lấy danh sách N câu hỏi ngẫu nhiên theo PartID, Level, ExamQuestion
exports.getRandomQuestions = async (req, res) => {
    const { part, level, examQuestion, n } = req.query;

    // Kiểm tra các tham số đầu vào
    if (!part || !level || !examQuestion || !n) {
        return res.status(400).json({ error: 'Thiếu tham số part, level, examQuestion hoặc n.' });
    }

    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('PartID', sql.Int, parseInt(part))
            .input('Level', sql.Int, parseInt(level))
            .input('ExamQuestion', sql.Bit, parseInt(examQuestion)) // ExamQuestion giả định là kiểu BIT
            .input('N', sql.Int, parseInt(n)) // Số lượng câu hỏi
            .query(
                `SELECT TOP (@N) * 
                 FROM Questions 
                 WHERE PartID = @PartID AND Level = @Level AND ExamQuestion = @ExamQuestion 
                 ORDER BY NEWID()` // Lấy ngẫu nhiên
            );

        res.json(result.recordset); // Trả về danh sách câu hỏi
    } catch (err) {
        console.error('Error fetching random questions:', err);
        res.status(500).send(err.message);
    }
};



// Lấy tất cả câu hỏi theo Part
exports.getQuestionsByPart = async (req, res) => {
    const { part } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('part', sql.Int, part)
            .query('SELECT * FROM Questions WHERE Part = @part');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Lấy thống kê câu hỏi của người dùng
exports.getUserQuestionStats = async (req, res) => {
    const { userId } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM GetUserQuestionStats(@userId)');
        res.json(result.recordset); // Trả về dữ liệu dưới dạng JSON
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Lấy nhóm câu hỏi ngẫu nhiên bằng Stored Procedure
exports.getRandomGroupByStoredProc = async (req, res) => {
    const partId = parseInt(req.params.partId);

    if (isNaN(partId)) {
        return res.status(400).json({ error: 'Invalid PartID' });
    }

    try {
        const pool = await sql.connect();
        const request = pool.request();
        request.input('PartID', sql.Int, partId);

        // Gọi stored procedure
        const result = await request.execute('GetRandomQuestionsByPart');

        res.json(result.recordset); // Trả về danh sách câu hỏi
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
    }
};

