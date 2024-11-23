const sql = require('mssql');

// Lấy danh sách câu hỏi theo phần
exports.getQuestionsByPart = async (req, res) => {
    const { part } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Part', sql.Int, part)
            .query('SELECT * FROM Questions WHERE Part = @Part');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Lấy câu hỏi ngẫu nhiên theo phần
exports.getRandomQuestionByPart = async (req, res) => {
    const { part } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Part', sql.Int, part)
            .query('SELECT TOP 1 * FROM Questions WHERE Part = @Part ORDER BY NEWID()');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getRandomGroupByPart = async (req, res) => {
    const partId = parseInt(req.params.partId);

    if (isNaN(partId)) {
        return res.status(400).json({ error: 'Invalid PartID' });
    }

    try {
        const pool = await sql.connect(); // Kết nối SQL
        const request = pool.request(); // Tạo request
        request.input('PartID', sql.Int, partId);

        // Gọi stored procedure
        const result = await request.execute('GetRandomQuestionsByPart');

        res.json(result.recordset); // Trả về danh sách câu hỏi
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
    }
};

   