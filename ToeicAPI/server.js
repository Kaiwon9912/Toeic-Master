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

        // API để lấy tất cả các chủ đề
        app.get('/api/topics', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Topics');
                res.json(result.recordset); // Trả về tất cả dữ liệu từ bảng Topics
            } catch (err) {
                res.status(500).send(`Lỗi: ${err.message}`);
            }
        });

        // API để lấy tất cả các bài học
        app.get('/api/lessons', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Lessons');
                res.json(result.recordset); // Trả về tất cả dữ liệu từ bảng Lessons
            } catch (err) {
                res.status(500).send(`Lỗi: ${err.message}`);
            }
        });

        // API để lấy tất cả các bài thi
        app.get('/api/exams', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Exams');
                res.json(result.recordset); // Trả về tất cả dữ liệu từ bảng Exams
            } catch (err) {
                res.status(500).send(`Lỗi: ${err.message}`);
            }
        });

        // API để cập nhật một chủ đề
        app.put('/api/topics/:topicID', async (req, res) => {
            const { topicID } = req.params;
            const { Name, Description } = req.body;
            try {
                // Cập nhật thông tin chủ đề theo TopicID
                const result = await pool.request()
                    .input('topicID', sql.Int, topicID)
                    .input('Name', sql.VarChar, Name)
                    .input('Description', sql.Text, Description)
                    .query('UPDATE Topics SET Name = @Name, Description = @Description WHERE TopicID = @topicID');

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
                    .input('topicID', pool.Int, topicID)
                    .query('DELETE FROM Topics WHERE TopicID = @topicID');
                if (result.rowsAffected[0] === 0) {
                    return res.status(404).send('Topic not found');
                }
                res.status(200).send('Topic deleted successfully');
            } catch (err) {
                res.status(500).send(`Error: ${err.message}`);
            }
        });

        // API để thêm một chủ đề mới
        app.post('/api/topics', async (req, res) => {
            const { Name, Description } = req.body;
            try {
                const result = await pool.request()
                    .input('Name', sql.VarChar, Name)
                    .input('Description', sql.Text, Description)
                    .query('INSERT INTO Topics (Name, Description) VALUES (@Name, @Description)');
                res.status(201).send(`Chủ đề đã được thêm với ID: ${result.rowsAffected}`);
            } catch (err) {
                res.status(500).send(err.message);
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
            const { Word, Translation, TopicID, PartOfSpeech, Pronunciation, ExampleSentence } = req.body;
            try {
                const result = await pool.request()
                    .input('Word', sql.VarChar, Word)
                    .input('Translation', sql.VarChar, Translation)
                    .input('TopicID', sql.Int, TopicID)
                    .input('PartOfSpeech', sql.VarChar, PartOfSpeech)
                    .input('Pronunciation', sql.VarChar, Pronunciation)
                    .input('ExampleSentence', sql.Text, ExampleSentence)
                    .query('INSERT INTO Vocabulary (Word, Translation, TopicID, PartOfSpeech, Pronunciation, ExampleSentence) VALUES (@Word, @Translation, @TopicID, @PartOfSpeech, @Pronunciation, @ExampleSentence)');
                res.status(201).send(`Từ đã được thêm với ID: ${result.rowsAffected}`);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // API để lấy danh sách từ vựng theo TopicID
        app.get('/api/vocabulary/topic/:topicId', async (req, res) => {
            const { topicId } = req.params;
            try {
                const result = await pool.request()
                    .input('TopicID', sql.Int, topicId)
                    .query('SELECT * FROM Vocabulary WHERE TopicID = @TopicID');
                res.json(result.recordset);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // API lấy câu hỏi ngẫu nhiên theo part
        app.get('/api/question/part/:part/random', async (req, res) => {
            const { part } = req.params;
            try {
                const result = await pool.request()
                    .input('part', sql.Int, part)
                    .query('SELECT TOP 1 * FROM Questions WHERE PartID = 5 and ExamQuestion = 0 ORDER BY NEWID()'); // Lấy ngẫu nhiên 1 câu hỏi
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
                    .query('SELECT * FROM Questions WHERE Part = @part');
                res.json(result.recordset);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        app.get('/api/user-question-stats/:userId', async (req, res) => {
            const { userId } = req.params;
            try {
                const result = await pool.request()
                    .input('userId', sql.Int, userId)
                    .query('SELECT * FROM GetUserQuestionStats(@userId)');
                res.json(result.recordset); // Trả về dữ liệu dưới dạng JSON
            } catch (error) {
                res.status(500).send(error.message);
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




    })
    .catch(err => console.error('Kết nối thất bại:', err));

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
