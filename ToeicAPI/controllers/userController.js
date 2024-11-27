const sql = require('mssql');

exports.createUser = async (req, res) => {
    const { username, passwordHash, fullName, email, role } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('passwordHash', sql.NVarChar, passwordHash)
            .input('fullName', sql.NVarChar, fullName)
            .input('email', sql.NVarChar, email)
            .input('role', sql.Bit, role)
            .query('INSERT INTO Users (Username, PasswordHash, FullName, Email, Role) VALUES (@username, @passwordHash, @fullName, @email, @role)');
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE UserID = @id');
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, fullName, email, role } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .input('username', sql.NVarChar, username)
            .input('fullName', sql.NVarChar, fullName)
            .input('email', sql.NVarChar, email)
            .input('role', sql.Bit, role)
            .query('UPDATE Users SET Username = @username, FullName = @fullName, Email = @email, Role = @role WHERE UserID = @id');
        res.send('User updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Users WHERE UserID = @id');
        res.send('User deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
