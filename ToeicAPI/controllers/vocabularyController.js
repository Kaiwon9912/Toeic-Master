const sql = require('mssql');

exports.getAllVocabulary = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Vocabulary');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.addVocabulary = async (req, res) => {
    const { Word, Translation, TopicID, PartOfSpeech, Pronunciation, ExampleSentence } = req.body;
    try {
        const pool = await sql.connect();
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
};

exports.getVocabularyByTopic = async (req, res) => {
    const { topicId } = req.params;
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('TopicID', sql.Int, topicId)
            .query('SELECT * FROM Vocabulary WHERE TopicID = @TopicID');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};



        