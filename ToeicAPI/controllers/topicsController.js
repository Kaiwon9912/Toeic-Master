const sql = require('mssql');

exports.getAllTopics = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Topics');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(`Lỗi: ${err.message}`);
    }
};

exports.addTopic = async (req, res) => {
    const { TopicID, Name, Image } = req.body; // Lấy TopicID, Name, và Image từ body của request
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('TopicID', sql.VarChar, TopicID)
            .input('Name', sql.NVarChar, Name) // Sử dụng NVarChar cho Unicode
            .query('INSERT INTO Topics (TopicID, Name ) VALUES (@TopicID, @Name)');

        res.status(201).send(`Chủ đề đã được thêm với ID: ${TopicID}`); // Trả về ID của chủ đề mới
    } catch (err) {
        res.status(500).send(err.message); // Xử lý lỗi
    }
};

// API: Cập nhật một chủ đề
exports.updateTopic = async (req, res) => {
    const { topicID } = req.params; // Lấy topicID từ URL
    const { Name, Image } = req.body; // Lấy Name và Image từ body của request

    try {
        const pool = await sql.connect();
        // Cập nhật thông tin chủ đề theo TopicID
        const result = await pool.request()
            .input('topicID', sql.VarChar, topicID) // Đảm bảo TopicID là VarChar
            .input('Name', sql.NVarChar, Name) // Sử dụng NVarChar cho Unicode
            .query('UPDATE Topics SET Name = @Name WHERE TopicID = @topicID');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Topic not found'); // Nếu không tìm thấy chủ đề
        }

        res.status(200).send('Topic updated successfully'); // Trả về thông báo thành công
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`); // Xử lý lỗi
    }
};

// API xóa chủ đề 
exports.deleteTopic = async (req, res) => {
    const { topicID } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('topicID', sql.NVarChar, topicID)
            .query('DELETE FROM Topics WHERE TopicID = @topicID');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Topic not found');
        }
        res.status(200).send('Topic deleted successfully');
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
};



