const sql = require('mssql');

// Lấy danh sách câu hỏi theo phần
exports.getRandomQuestionByPart = async (req, res) => {
    const { part, examQuestion } = req.params;  // Lấy cả part và examQuestion từ tham số URL
    try {
        const pool = await sql.connect();
        
        // Truy vấn câu hỏi ngẫu nhiên với PartID và ExamQuestion
        const result = await pool.request()
            .input('part', sql.Int, part)  // Nhận tham số part từ URL
            .input('examQuestion', sql.Int, examQuestion)  // Nhận tham số examQuestion từ URL
            .query('SELECT TOP 1 * FROM Questions WHERE PartID = @part AND ExamQuestion = @examQuestion ORDER BY NEWID()'); // Lấy ngẫu nhiên 1 câu hỏi

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Lấy danh sách N câu hỏi ngẫu nhiên theo PartID, Level, ExamQuestion
exports.getRandomQuestions = async (req, res) => {
    const { part, level, examQuestion, n } = req.query;

    // Kiểm tra các tham số đầu vào
    if (!part || !level || !examQuestion || !n) {
        return res.status(400).json({ error: 'Thiếu tham số part, level, examQuestion hoặc n.' });
    }

    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('PartID', sql.Int, parseInt(part))
            .input('Level', sql.Int, parseInt(level))
            .input('ExamQuestion', sql.Bit, parseInt(examQuestion)) // ExamQuestion giả định là kiểu BIT
            .input('N', sql.Int, parseInt(n)) // Số lượng câu hỏi
            .query(
                `SELECT TOP (@N) * 
                 FROM Questions 
                 WHERE PartID = @PartID AND Level = @Level AND ExamQuestion = @ExamQuestion 
                 ORDER BY NEWID()` // Lấy ngẫu nhiên
            );

        res.json(result.recordset); // Trả về danh sách câu hỏi
    } catch (err) {
        console.error('Error fetching random questions:', err);
        res.status(500).send(err.message);
    }
};

exports.getNGroupQuestionByLevelnPart = async (req, res) => {
    try {
        const { N, PartID, Level } = req.query;

        // Validate input
        if (!N || !PartID || !Level) {
            return res.status(400).json({ message: "Missing required query parameters: N, PartID, Level" });
        }

        // Query database
        const questions = await Question.find({
            PartID: PartID,
            Level: Level,
            ExamQuestion: true
        })
            .limit(parseInt(N)) // Limit by N groups
            .populate('QuestionGroupID') // Populate QuestionGroup if it's a reference
            .exec();

        return res.status(200).json({ questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching questions." });
    }
};

// Lấy tất cả câu hỏi theo Part
exports.getQuestionsByPart = async (req, res) => {
    const { part } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('part', sql.Int, part)
            .query('SELECT * FROM Questions WHERE Part = @part');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Lấy thống kê câu hỏi của người dùng
exports.getUserQuestionStats = async (req, res) => {
    const { userId } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM GetUserQuestionStats(@userId)');
        res.json(result.recordset); // Trả về dữ liệu dưới dạng JSON
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Lấy nhóm câu hỏi ngẫu nhiên bằng Stored Procedure
exports.getRandomGroupByStoredProc = async (req, res) => {
    const partId = parseInt(req.params.partId);

    if (isNaN(partId)) {
        return res.status(400).json({ error: 'Invalid PartID' });
    }

    try {
        const pool = await sql.connect();
        const request = pool.request();
        request.input('PartID', sql.Int, partId);

        // Gọi stored procedure
        const result = await request.execute('GetRandomQuestionsByPart');

        res.json(result.recordset); // Trả về danh sách câu hỏi
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getRandomQuestionsByPartAndLevel = async (req, res) => {
    // Lấy các tham số từ query string
    const n = parseInt(req.query.n);
    const part = parseInt(req.query.part);
    const level = parseInt(req.query.level);

    // Kiểm tra xem các tham số có hợp lệ không
    if (isNaN(n) || isNaN(part) || isNaN(level)) {
        return res.status(400).json({ error: 'Invalid parameters: n, part, or level must be numbers' });
    }

    try {
        // Kết nối tới SQL Server
        const pool = await sql.connect();
        const request = pool.request();
        
        // Truyền tham số vào stored procedure
        request.input('N', sql.Int, n);
        request.input('Part', sql.Int, part);
        request.input('Level', sql.Int, level);

        // Gọi stored procedure
        const result = await request.execute('GetRandomQuestionsByPartAndLevel');

        // Trả về kết quả câu hỏi
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
    }
};





exports.createQuestion = async (req, res) => {
    const { questionGroupId, partId, level, questionAudio, questionText, questionImage, answerA, answerB, answerC, answerD, correctAnswer, explanation, examQuestion } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('questionGroupId', sql.VarChar, questionGroupId)
            .input('partId', sql.Int, partId)
            .input('level', sql.Int, level)
            .input('questionAudio', sql.NVarChar, questionAudio)
            .input('questionText', sql.NVarChar, questionText)
            .input('questionImage', sql.NVarChar, questionImage)
            .input('answerA', sql.NVarChar, answerA)
            .input('answerB', sql.NVarChar, answerB)
            .input('answerC', sql.NVarChar, answerC)
            .input('answerD', sql.NVarChar, answerD)
            .input('correctAnswer', sql.Char, correctAnswer)
            .input('explanation', sql.NVarChar, explanation)
            .input('examQuestion', sql.Bit, examQuestion)
            .query(`
                INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, Explanation, ExamQuestion)
                VALUES (@questionGroupId, @partId, @level, @questionAudio, @questionText, @questionImage, @answerA, @answerB, @answerC, @answerD, @correctAnswer, @explanation, @examQuestion)
            `);
        res.status(201).send('Question created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getQuestionById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Questions WHERE QuestionID = @id');
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { questionGroupId, partId, level, questionAudio, questionText, questionImage, answerA, answerB, answerC, answerD, correctAnswer, explanation, examQuestion } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .input('questionGroupId', sql.VarChar, questionGroupId)
            .input('partId', sql.Int, partId)
            .input('level', sql.Int, level)
            .input('questionAudio', sql.NVarChar, questionAudio)
            .input('questionText', sql.NVarChar, questionText)
            .input('questionImage', sql.NVarChar, questionImage)
            .input('answerA', sql.NVarChar, answerA)
            .input('answerB', sql.NVarChar, answerB)
            .input('answerC', sql.NVarChar, answerC)
            .input('answerD', sql.NVarChar, answerD)
            .input('correctAnswer', sql.Char, correctAnswer)
            .input('explanation', sql.NVarChar, explanation)
            .input('examQuestion', sql.Bit, examQuestion)
            .query(`
                UPDATE Questions 
                SET QuestionGroupID = @questionGroupId, PartID = @partId, Level = @level, QuestionAudio = @questionAudio,
                    QuestionText = @questionText, QuestionImage = @questionImage, AnswerA = @answerA, AnswerB = @answerB, 
                    AnswerC = @answerC, AnswerD = @answerD, CorrectAnswer = @correctAnswer, Explanation = @explanation, ExamQuestion = @examQuestion
                WHERE QuestionID = @id
            `);
        res.send('Question updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Questions WHERE QuestionID = @id');
        res.send('Question deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};


