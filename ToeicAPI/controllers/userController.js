const sql = require('mssql');


// API để lấy tất cả người dùng
exports.getUser = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Users');
        console.log('Dữ liệu users:', result.recordset); // Log dữ liệu trả về
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu users:', err.message); // Log lỗi
        res.status(500).send(err.message);
    }
};

exports.createUser =  async (req, res) => {
    const { username, password, fullName, email, role } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa (optional)
    try {
        const pool = await sql.connect();
        const existingUser = await pool.request()
            .input('Username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE Username = @Username');

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        
        // Thêm người dùng mới vào cơ sở dữ liệu
        await pool.request()
            .input('Username', sql.NVarChar, username)
            .input('PasswordHash', sql.NVarChar, password) // Nên mã hóa mật khẩu trước khi lưu trữ
            .input('FullName', sql.NVarChar, fullName)
            .input('Email', sql.NVarChar, email)
            .input('Role', sql.Int, role) // Mặc định role là 0 nếu không được cung cấp
            .query('INSERT INTO Users (Username, PasswordHash, FullName, Email, Role) VALUES (@Username, @PasswordHash, @FullName, @Email, @Role)');

        res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error('Lỗi khi thêm người dùng:', err.message); // Log lỗi
        res.status(500).send(err.message);
    }
};


 // API để reset mật khẩu của người dùng
 exports.resetpassword = async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body; // Lấy mật khẩu mới từ body

    try {
        const pool = await sql.connect();
        // Thực hiện truy vấn SQL để cập nhật mật khẩu
        await pool.request()
            .input('newPassword', sql.VarChar, newPassword)
            .input('userId', sql.VarChar, userId) // Cần thay đổi kiểu dữ liệu nếu cần
            .query('UPDATE Users SET PasswordHash = @newPassword WHERE Username = @userId');

        res.status(200).send('Mật khẩu đã được reset thành công.');
    } catch (err) {
        console.error('Lỗi khi reset mật khẩu:', err.message);
        res.status(500).send(err.message);
    }
};

// API để lấy người dùng theo tên đăng nhập
exports.getUserByName =  async (req, res) => {
    const { username } = req.params;

    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE Username = @Username');

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]); // Trả về thông tin người dùng
        } else {
            res.status(404).json({ message: 'User not found.' }); // Không tìm thấy người dùng
        }
    } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err.message); // Log lỗi
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
    const username = req.params.username; // Lấy username từ tham số

    try {
        const pool = await sql.connect();
        // Thực hiện truy vấn SQL để xóa người dùng
        const result = await pool.request()
            .input('username', sql.VarChar, username) // Cần thay đổi kiểu dữ liệu nếu cần
            .query('DELETE FROM Users WHERE Username = @username');

        // Kiểm tra số dòng bị ảnh hưởng
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Người dùng đã được xóa thành công!' });
        } else {
            res.status(404).json({ message: 'Người dùng không tìm thấy!' });
        }
    } catch (err) {
        console.error('Lỗi khi xóa người dùng:', err.message);
        res.status(500).json({ error: 'Lỗi khi xóa người dùng: ' + err.message });
    }
};
