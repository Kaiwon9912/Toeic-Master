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
                res.json(result.recordset);
            } catch (err) {
                res.status(500).send(err.message);
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

        app.get('/api/lessons', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Lessons');
                res.json(result.recordset);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });
        app.get('/api/lessons/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const result = await pool.request()
                    .input('id', sql.Int, id) // Đảm bảo rằng id là số nguyên
                    .query('SELECT * FROM Lessons WHERE LessonID = @id');
                if (result.recordset.length === 0) {
                    return res.status(404).send('Lesson not found'); // Nếu không tìm thấy bài học
                }
                res.json(result.recordset[0]); // Trả về bài học đầu tiên
            } catch (err) {
                res.status(500).send(err.message);
            }
        });
        



    })
    .catch(err => console.error('Kết nối thất bại:', err));

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});