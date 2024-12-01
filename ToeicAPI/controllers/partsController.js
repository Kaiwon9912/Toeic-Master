const sql = require('mssql');

// Controller để lấy danh sách Parts
exports.getAllParts = async (req, res) => {
    try {
        const pool = await sql.connect(); // Kết nối tới SQL Server
        const result = await pool.request().query('SELECT * FROM Parts'); // Truy vấn tất cả dữ liệu từ bảng Parts
        res.json(result.recordset); // Trả về danh sách Parts dưới dạng JSON
    } catch (err) {
        console.error('Error fetching Parts:', err);
        res.status(500).send('Internal Server Error');
    }
};
