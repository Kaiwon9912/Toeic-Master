const sql = require('mssql');

exports.getAllTopics = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Topics');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.addTopic = async (req, res) => {
    const { Name, Description } = req.body;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Name', sql.VarChar, Name)
            .input('Description', sql.Text, Description)
            .query('INSERT INTO Topics (Name, Description) VALUES (@Name, @Description)');
        res.status(201).send(`Chủ đề đã được thêm với ID: ${result.rowsAffected}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
};



