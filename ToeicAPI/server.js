const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./dbconfig');

const app = express();
const port = 3000;

// Middleware để cho phép CORS
app.use(cors()); // Cho phép tất cả các origin

// Middleware để parse JSON
app.use(express.json());


sql.connect(config)
    .then(pool => {
        console.log('Kết nối thành công đến SQL Server');

        // API để lấy tất cả các bài thi
        app.get('/api/exams', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Exams');
                res.json(result.recordset); // Trả về tất cả dữ liệu từ bảng Exams
            } catch (err) {
                res.status(500).send(`Lỗi: ${err.message}`);
            }
        });

        // API để lấy tất cả các part
        app.get('/api/parts', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Parts');
                console.log('Dữ liệu part:', result.recordset); // Log dữ liệu trả về
                res.json(result.recordset);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu parts:', err.message); // Log lỗi
                res.status(500).send(err.message);
            }
        });

        //APi lấy câu hỏi ngẫu nhiên theo part
        app.get('/api/question/part/:part/random', async (req, res) => {
            const { part } = req.params;
            try {
                const result = await pool.request()
                    .input('part', sql.Int, part)
                    .query('SELECT TOP 1 * FROM Questions WHERE PartID = 5 and ExamQuestion =0 ORDER BY NEWID()'); // Lấy ngẫu nhiên 1 câu hỏi
                res.json(result.recordset);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });
        // Lấy câu hỏi theo từng part
        app.get('/api/question/part/:part', async (req, res) => {
            const { part } = req.params;
            try {
                const result = await pool.request()
                    .input('part', sql.Int, part)
                    .query('SELECT  * FROM Questions WHERE Part = @part');
                res.json(result.recordset);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.get("/api/random-group/:partId", async (req, res) => {
            const partId = parseInt(req.params.partId);

            if (isNaN(partId)) {
                return res.status(400).json({ error: "Invalid PartID" });
            }

            try {

                const request = new sql.Request();
                request.input("PartID", sql.Int, partId);

                const result = await request.execute("GetRandomQuestionsByPart");

                res.json(result.recordset);
            } catch (err) {
                console.error("Error executing stored procedure:", err);
                res.status(500).send("Internal Server Error");
            }
        });



















        // API để lấy tất cả từ vựng
        app.get('/api/vocabulary', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Vocabulary');
                res.json(result.recordset);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // API để thêm một từ mới
        app.post('/api/vocabulary', async (req, res) => {
            const { Word, Translation, TopicID } = req.body; // Giả định rằng chỉ có 3 trường này cần thiết cho phép thêm

            try {
                const result = await pool.request()
                    .input('Word', sql.VarChar, Word)
                    .input('Translation', sql.NVarChar, Translation) // Sử dụng NVarChar cho tiếng Việt
                    .input('TopicID', sql.VarChar, TopicID) // Điều chỉnh kiểu dữ liệu nếu TopicID là chuỗi
                    .query(`
                INSERT INTO Vocabulary (Word, Translation, TopicID) 
                VALUES (@Word, @Translation, @TopicID)
            `);

                res.status(201).send(`Từ đã được thêm với ID: ${result.rowsAffected}`);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });
        // API để sửa một từ
        app.put('/api/vocabulary/:id', async (req, res) => {
            const { Word, Translation, TopicID } = req.body; // Các trường cần sửa
            const id = req.params.id; // Lấy ID từ tham số URL

            try {
                const result = await pool.request()
                    .input('Word', sql.VarChar, Word)
                    .input('Translation', sql.NVarChar, Translation)
                    .input('TopicID', sql.VarChar, TopicID)
                    .input('ID', sql.Int, id) // Giả định ID là kiểu Int
                    .query(`
                UPDATE Vocabulary 
                SET Word = @Word, Translation = @Translation, TopicID = @TopicID 
                WHERE WordID = @ID
            `);

                if (result.rowsAffected[0] === 0) {
                    return res.status(404).send('Không tìm thấy từ để sửa.');
                }

                res.send('Từ đã được sửa thành công.');
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // API để xóa một từ
        app.delete('/api/vocabulary/:id', async (req, res) => {
            const id = req.params.id; // Lấy ID từ tham số URL

            try {
                const result = await pool.request()
                    .input('ID', sql.Int, id) // Giả định ID là kiểu Int
                    .query(`
                DELETE FROM Vocabulary 
                WHERE WordID = @ID
            `);

                if (result.rowsAffected[0] === 0) {
                    return res.status(404).send('Không tìm thấy từ để xóa.');
                }

                res.send('Từ đã được xóa thành công.');
            } catch (err) {
                res.status(500).send(err.message);
            }
        });























        // API để lấy tất cả các chủ đề
        app.get('/api/topics', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Topics');
                res.json(result.recordset);
            } catch (err) {
                res.status(500).send(`Lỗi: ${err.message}`);
            }
        });

        // API: Cập nhật một chủ đề
        app.put('/api/topics/:topicID', async (req, res) => {
            const { topicID } = req.params; // Lấy topicID từ URL
            const { Name, Image } = req.body; // Lấy Name và Image từ body của request

            try {
                // Cập nhật thông tin chủ đề theo TopicID
                const result = await pool.request()
                    .input('topicID', sql.VarChar, topicID) // Đảm bảo TopicID là VarChar
                    .input('Name', sql.NVarChar, Name) // Sử dụng NVarChar cho Unicode
                    .input('Image', sql.VarChar, Image)
                    .query('UPDATE Topics SET Name = @Name, Image = @Image WHERE TopicID = @topicID');

                if (result.rowsAffected[0] === 0) {
                    return res.status(404).send('Topic not found'); // Nếu không tìm thấy chủ đề
                }

                res.status(200).send('Topic updated successfully'); // Trả về thông báo thành công
            } catch (err) {
                res.status(500).send(`Error: ${err.message}`); // Xử lý lỗi
            }
        });

        // API xóa chủ đề 
        app.delete('/api/topics/:topicID', async (req, res) => {
            const { topicID } = req.params;
            try {
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
        });

        /// API: Thêm một chủ đề mới
        app.post('/api/topics', async (req, res) => {
            const { TopicID, Name, Image } = req.body; // Lấy TopicID, Name, và Image từ body của request
            try {
                const result = await pool.request()
                    .input('TopicID', sql.VarChar, TopicID)
                    .input('Name', sql.NVarChar, Name) // Sử dụng NVarChar cho Unicode
                    .input('Image', sql.VarChar, Image)
                    .query('INSERT INTO Topics (TopicID, Name, Image) VALUES (@TopicID, @Name, @Image)');

                res.status(201).send(`Chủ đề đã được thêm với ID: ${TopicID}`); // Trả về ID của chủ đề mới
            } catch (err) {
                res.status(500).send(err.message); // Xử lý lỗi
            }
        });



















        // API lấy question groups
        app.get('/api/question-groups', async (req, res) => {
            try {
                const result = await pool.request()
                    .query('SELECT * FROM QuestionGroup');

                console.log('Dữ liệu question groups:', result.recordset); // Log dữ liệu trả về
                res.json(result.recordset);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu question groups:', err.message); // Log lỗi
                res.status(500).send(err.message);
            }
        });


        //API lấy questions cho 4 phần listening
        app.get('/api/questions/:partID', async (req, res) => {
            const partID = req.params.partID; // Lấy partID từ URL

            try {
                const result = await pool.request()
                    .input('PartID', sql.Int, partID) // Sử dụng input để bảo vệ khỏi SQL Injection
                    .query('SELECT * FROM Questions WHERE PartID = @PartID');

                console.log('Dữ liệu câu hỏi:', result.recordset); // Log dữ liệu trả về
                res.json(result.recordset);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu câu hỏi:', err.message); // Log lỗi
                res.status(500).send(err.message);
            }
        });



























        // API để lấy tất cả người dùng
        app.get('/api/users', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Users');
                console.log('Dữ liệu users:', result.recordset); // Log dữ liệu trả về
                res.json(result.recordset);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu users:', err.message); // Log lỗi
                res.status(500).send(err.message);
            }
        });

        // API để reset mật khẩu của người dùng
        app.post('/api/users/reset-password/:userId', async (req, res) => {
            const { userId } = req.params;
            const { newPassword } = req.body; // Lấy mật khẩu mới từ body

            try {
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
        });

        // API xóa người dùng
        app.delete('/api/users/:username', async (req, res) => {
            const username = req.params.username; // Lấy username từ tham số

            try {
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
        });















        // API để lấy tất cả các bài học
        app.get('/api/lessons', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Lessons');
                console.log('Dữ liệu lessons:', result.recordset); // Log dữ liệu trả về
                res.json(result.recordset);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu lessons:', err.message); // Log lỗi
                res.status(500).send(err.message);
            }
        });

        // API để thêm bài học
        app.post('/api/lessons', async (req, res) => {
            const { Title, Content, QuestionType, Guide, PartID } = req.body;

            try {
                const result = await pool.request()
                    .input('Title', sql.VarChar, Title)
                    .input('Content', sql.Text, Content)
                    .input('QuestionType', sql.VarChar, QuestionType)
                    .input('Guide', sql.Text, Guide)
                    .input('PartID', sql.Int, PartID) // Đảm bảo kiểu dữ liệu khớp
                    .query(`
                INSERT INTO Lessons (Title, Content, QuestionType, Guide, PartID)
                OUTPUT INSERTED.LessonID AS LessonID
                VALUES (@Title, @Content, @QuestionType, @Guide, @PartID)
            `);

                // Kiểm tra xem có kết quả không
                if (result.rowsAffected[0] > 0) {
                    const lessonId = result.recordset[0].LessonID; // Lấy ID của bài học mới
                    res.status(201).json({ message: 'Bài học đã được thêm thành công!', LessonID: lessonId });
                } else {
                    res.status(500).json({ error: 'Có lỗi xảy ra khi thêm bài học.' });
                }
            } catch (err) {
                console.error('Lỗi khi thêm bài học:', err.message);
                res.status(500).json({ error: 'Lỗi khi thêm bài học: ' + err.message });
            }
        });

        // API để sửa bài học
        app.put('/api/lessons/:id', async (req, res) => {
            const { id } = req.params;
            const { Title, Content, QuestionType, Guide, PartID } = req.body;

            try {
                const result = await pool.request()
                    .input('Title', sql.VarChar, Title)
                    .input('Content', sql.Text, Content)
                    .input('QuestionType', sql.VarChar, QuestionType)
                    .input('Guide', sql.Text, Guide)
                    .input('PartID', sql.Int, PartID) // Đảm bảo kiểu dữ liệu khớp với cơ sở dữ liệu
                    .input('LessonID', sql.Int, id) // Sử dụng kiểu Int nếu LessonID là số
                    .query('UPDATE Lessons SET Title = @Title, Content = @Content, QuestionType = @QuestionType, Guide = @Guide, PartID = @PartID WHERE LessonID = @LessonID');

                if (result.rowsAffected[0] > 0) {
                    res.status(200).json({ message: 'Bài học đã được cập nhật thành công!' });
                } else {
                    res.status(404).json({ message: 'Bài học không tìm thấy!' });
                }
            } catch (err) {
                console.error('Lỗi khi sửa bài học:', err.message);
                res.status(500).json({ error: 'Lỗi khi sửa bài học: ' + err.message });
            }
        });

        // API để xóa bài học
        app.delete('/api/lessons/:id', async (req, res) => {
            const { id } = req.params;

            try {
                const result = await pool.request()
                    .input('LessonID', sql.VarChar, id) // Thay đổi kiểu dữ liệu nếu cần thiết
                    .query('DELETE FROM Lessons WHERE LessonID = @LessonID');

                if (result.rowsAffected[0] > 0) {
                    res.status(200).json({ message: 'Bài học đã được xóa thành công!' });
                } else {
                    res.status(404).json({ message: 'Bài học không tìm thấy!' });
                }
            } catch (err) {
                console.error('Lỗi khi xóa bài học:', err.message);
                res.status(500).json({ error: 'Lỗi khi xóa bài học: ' + err.message });
            }
        });












    })
    .catch(err => console.error('Kết nối thất bại:', err));

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});