const sql = require('mssql');

const getExamsByPart = async (req, res) => {
    const { partID } = req.params; // Lấy partID từ URL
    try {
        const pool = await sql.connect(); // Kết nối tới SQL Server
        const result = await pool.request()
            .input('partID', sql.VarChar, partID) // Truyền tham số vào truy vấn
            .query("SELECT * FROM Exams WHERE ExamID LIKE 'P' + @partID + '%'"); // Xây dựng câu truy vấn
        res.json(result.recordset); // Trả về kết quả dưới dạng JSON
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Đã xảy ra lỗi khi truy vấn danh sách Exams.");
    }
};
module.exports = { getExamsByPart };
