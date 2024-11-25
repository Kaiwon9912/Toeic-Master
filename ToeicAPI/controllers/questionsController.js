const sql = require('mssql');

// Lấy danh sách câu hỏi theo phần
exports.getRandomQuestionByPart = async (req, res) => {
    const { part } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('part', sql.Int, part)
            .query('SELECT TOP 1 * FROM Questions WHERE PartID = 5 AND ExamQuestion = 0 ORDER BY NEWID()'); // Lấy ngẫu nhiên 1 câu hỏi
        res.json(result.recordset);
    } catch (err) {
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

