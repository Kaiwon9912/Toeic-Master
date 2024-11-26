const sql = require('mssql');

exports.getExamsByLevel = async (req, res) => {
    const { level } = req.params; // Lấy partID từ URL
    try {
        const pool = await sql.connect(); // Kết nối tới SQL Server
        const result = await pool.request()
            .input('level', sql.VarChar, level) // Truyền tham số vào truy vấn
            .query("select * from Exams where Level= @level"); // Xây dựng câu truy vấn
        res.json(result.recordset); // Trả về kết quả dưới dạng JSON
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Đã xảy ra lỗi khi truy vấn danh sách Exams.");
    }
};

// Lấy thông tin exam theo ExamID
exports.getExamById = async (req, res) => {
    const { examId } = req.params;

    // Kiểm tra nếu ExamID không hợp lệ
    if (!examId) {
        return res.status(400).json({ error: 'Thiếu tham số ExamID.' });
    }

    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('ExamID', sql.VarChar, examId)  // ExamID là chuỗi (varchar)
            .query('SELECT * FROM Exams WHERE ExamID = @ExamID');  // Truy vấn lấy thông tin exam theo ExamID

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy exam với ExamID này.' });
        }

        res.json(result.recordset[0]); // Trả về thông tin exam
    } catch (err) {
        console.error('Error fetching exam:', err);
        res.status(500).send(err.message);
    }
};

exports.getAllExams = async (req, res) => {
    try {
        const pool = await sql.connect(); // Kết nối tới SQL Server
        const result = await pool.request()
            .query("SELECT * FROM Exams"); // Xây dựng câu truy vấn
        res.json(result.recordset); // Trả về kết quả dưới dạng JSON
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Đã xảy ra lỗi khi truy vấn danh sách Exams.");
    }
};


