
CREATE DATABASE ToeicData
GO

USE ToeicData 


CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    Role BIT DEFAULT 0,

);


CREATE TABLE Parts(
	PartID INT PRIMARY KEY,
	Title NVARCHAR(MAX),
	MediaURL NVARCHAR(MAX),
)


CREATE TABLE Lessons (
    LessonID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,  -- Tiêu đề bài học
    Content NVARCHAR(MAX),  -- Nội dung bài học (có thể là văn bản, hoặc mô tả về tài liệu)
	QuestionType NVARCHAR(MAX),
	Guide NVARCHAR(MAX),
	Score NVARCHAR(50),
	PartID int,
	FOREIGN KEY (PartID) REFERENCES Parts(PartID)
);

CREATE TABLE QuestionGroup(
	QuestionGroupID VARCHAR(255) PRIMARY KEY,
	Audio VARCHAR(MAX),
	Content NVARCHAR(MAX),
);

CREATE TABLE Questions (
    QuestionID INT PRIMARY KEY IDENTITY(1,1),
    QuestionGroupID VARCHAR(255),  -- Kiểu dữ liệu là VARCHAR
    PartID INT,  -- Phần của đề thi (Listening, Reading, etc.)
    Level INT,  -- Mức độ câu hỏi (dễ, trung bình, khó)
    QuestionAudio NVARCHAR(MAX),
    QuestionText NVARCHAR(MAX) NOT NULL,  -- Nội dung câu hỏi
    QuestionImage NVARCHAR(MAX),  -- Hình ảnh (nếu có) đi kèm câu hỏi
    AnswerA NVARCHAR(255) NOT NULL,  -- Đáp án A
    AnswerB NVARCHAR(255) NOT NULL,  -- Đáp án B
    AnswerC NVARCHAR(255) NOT NULL,  -- Đáp án C
    AnswerD NVARCHAR(255) NOT NULL,  -- Đáp án D
    CorrectAnswer CHAR(1) NOT NULL,  -- Đáp án đúng (chỉ nhận giá trị 'A', 'B', 'C' hoặc 'D')
    ExamQuestion BIT DEFAULT 0,  -- Câu hỏi có phải là câu hỏi trong đề thi chính thức hay không
    Explanation NVARCHAR(MAX),
    FOREIGN KEY (QuestionGroupID) 
        REFERENCES QuestionGroup(QuestionGroupID) 
        ON DELETE CASCADE,  -- Khi xóa QuestionGroup, câu hỏi tương ứng cũng sẽ bị xóa
    FOREIGN KEY (PartID) REFERENCES Parts(PartID)
);

CREATE TABLE Topics (
    TopicID VARCHAR(10) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
);



CREATE TABLE Vocabulary (
    WordID INT PRIMARY KEY IDENTITY(1,1),
    Word VARCHAR(100) NOT NULL,
    Translation NVARCHAR(100) NOT NULL,
    TopicID VARCHAR(10),
	Image NVARCHAR(255),
    FOREIGN KEY (TopicID) REFERENCES Topics(TopicID)
);

CREATE TABLE User_Vocabulary (
    ID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    WordID INT,
    Learned BIT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (WordID) REFERENCES Vocabulary(WordID)
);



CREATE TABLE User_Question(
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    QuestionID INT,
	Saved  BIT DEFAULT 0,
	FOREIGN KEY (UserID) REFERENCES Users(UserID),
	FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID)
 
);
CREATE TABLE Exams (
    ExamID VARCHAR(100) PRIMARY KEY,
    ExamName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    TotalQuestions INT,
    DurationInMinutes INT,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE ExamDetail (
    ExamID VARCHAR(100),  -- ID của bài thi
	QuestionID INT,
	FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
    FOREIGN KEY (ExamID) REFERENCES Exams(ExamID),
	PRIMARY KEY(ExamID,QuestionID)
);

CREATE TABLE Exams (
    ExamID VARCHAR(100) PRIMARY KEY,
    ExamName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    TotalQuestions INT,
    DurationInMinutes INT,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE ExamDetail (
    ExamID VARCHAR(100),  -- ID của bài thi
	QuestionID INT,
	FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
    FOREIGN KEY (ExamID) REFERENCES Exams(ExamID),
	PRIMARY KEY(ExamID,QuestionID)
);



CREATE TABLE ExamResults (
    ResultID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ExamID VARCHAR(100) FOREIGN KEY REFERENCES Exams(ExamID),
    Score INT,
    CompletedAt DATETIME DEFAULT GETDATE()
);




CREATE FUNCTION GetUserQuestionStats(@UserID INT)
RETURNS TABLE
AS
RETURN (
    SELECT 
        Q.PartID,  -- Phần của câu hỏi
        P.Title,  -- Tiêu đề của Part
        COUNT(Q.QuestionID) AS TotalQuestions,  -- Tổng số câu hỏi của phần đó
        COUNT(UQR.QuestionID) AS CompletedQuestions,  -- Số câu hỏi đã làm
        SUM(CASE 
            WHEN UQR.Saved = 1 THEN 1 
            ELSE 0 
        END) AS IncorrectQuestions  -- Số câu trả lời sai (Saved = 1)
    FROM 
        Questions Q
    LEFT JOIN 
        User_Question UQR ON Q.QuestionID = UQR.QuestionID AND UQR.UserID = @UserID
    LEFT JOIN 
        Parts P ON Q.PartID = P.PartID
	WHERE ExamQuestion =0
    GROUP BY 
        Q.PartID, P.Title
);








/****** Object:  StoredProcedure [dbo].[GetQuestionsByPartGroupLevelAndExam]    Script Date: 11/28/2024 9:03:50 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetQuestionsByPartGroupLevelAndExam]
    @N INT,                -- Số lượng nhóm câu hỏi
    @PartID INT,           -- ID của phần thi (Listening, Reading, etc.)
    @Level INT             -- Mức độ câu hỏi (1: dễ, 2: trung bình, 3: khó)
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy ra N nhóm câu hỏi ngẫu nhiên
    WITH RandomQuestionGroups AS (
        SELECT TOP (@N) QuestionGroupID
        FROM QuestionGroup
        ORDER BY NEWID()  -- Lấy ngẫu nhiên các nhóm câu hỏi
    )
    -- Lấy câu hỏi thuộc các nhóm câu hỏi ngẫu nhiên, phần thi, mức độ và là câu hỏi trong đề thi chính thức
    SELECT 
        q.QuestionID,
        q.QuestionGroupID,
        q.PartID,
        q.Level,
        q.QuestionAudio,
        q.QuestionText,
        q.QuestionImage,
        q.AnswerA,
        q.AnswerB,
        q.AnswerC,
        q.AnswerD,
        q.CorrectAnswer,
        q.ExamQuestion,
        q.Explanation
    FROM Questions q
    INNER JOIN RandomQuestionGroups r ON q.QuestionGroupID = r.QuestionGroupID
    WHERE 
        q.PartID = @PartID AND 
        q.Level = @Level AND 
        q.ExamQuestion = 1
    ORDER BY q.QuestionID;  -- Sắp xếp kết quả theo ID câu hỏi
END;
GO


/****** Object:  StoredProcedure [dbo].[GetRandomGroupByPart]    Script Date: 11/28/2024 9:04:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetRandomGroupByPart]
    @PartID INT
AS
BEGIN
    -- Lấy một QuestionGroupID ngẫu nhiên cho PartID nhất định
    WITH RandomGroup AS (
        SELECT TOP 1 QuestionGroupID
        FROM Questions
        WHERE PartID = @PartID AND QuestionGroupID IS NOT NULL
        ORDER BY NEWID() -- Lấy ngẫu nhiên một QuestionGroupID
    )
    -- Truy vấn các câu hỏi trong QuestionGroup đã chọn
    SELECT 
        Q.QuestionID,
        Q.QuestionText,
        Q.AnswerA,
        Q.AnswerB,
        Q.AnswerC,
        Q.AnswerD,
        Q.CorrectAnswer,
        Q.Explanation,
        G.Content
    FROM 
        Questions Q
    JOIN 
        QuestionGroup G ON Q.QuestionGroupID = G.QuestionGroupID
    WHERE 
        Q.QuestionGroupID = (SELECT QuestionGroupID FROM RandomGroup);
END;
GO



/****** Object:  StoredProcedure [dbo].[GetRandomQuestionsByPart]    Script Date: 11/28/2024 9:04:09 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetRandomQuestionsByPart]
    @PartID INT
AS
BEGIN
    WITH RandomGroup AS (
        SELECT TOP 1 QuestionGroupID
        FROM Questions
        WHERE PartID = @PartID AND QuestionGroupID IS NOT NULL
        ORDER BY NEWID()
    )
    SELECT 
        Q.QuestionID,
        Q.QuestionText,
        Q.AnswerA,
        Q.AnswerB,
        Q.AnswerC,
        Q.AnswerD,
        Q.CorrectAnswer,
        Q.Explanation,
        G.Content
    FROM 
        Questions Q
    JOIN 
        QuestionGroup G ON Q.QuestionGroupID = G.QuestionGroupID
    WHERE 
        Q.QuestionGroupID = (SELECT QuestionGroupID FROM RandomGroup);
END;
GO



/****** Object:  StoredProcedure [dbo].[GetRandomQuestionsByPartAndLevel]    Script Date: 11/28/2024 9:04:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetRandomQuestionsByPartAndLevel]
    @N INT,        -- Số lượng câu hỏi nhóm cần lấy ngẫu nhiên
    @PartID INT,   -- Mã phần câu hỏi (PartID)
    @Level INT     -- Mức độ câu hỏi (Level)
AS
BEGIN
    -- Biến lưu trữ danh sách QuestionGroupID ngẫu nhiên
    DECLARE @RandomGroupIDs TABLE (QuestionGroupID VARCHAR(255));

    -- Lấy ngẫu nhiên N QuestionGroupID từ function GetGroupQuestionsWithExamQuestion
    INSERT INTO @RandomGroupIDs (QuestionGroupID)
    SELECT TOP (@N) QuestionGroupID
    FROM dbo.GetGroupQuestionsWithExamQuestion(@PartID, @Level)
    ORDER BY NEWID();  -- Lấy ngẫu nhiên

    -- Truy vấn các câu hỏi thuộc về các QuestionGroupID ngẫu nhiên
    SELECT 
        q.QuestionID,
        q.QuestionGroupID,
        q.PartID,
        q.Level,
        q.QuestionText,
        q.AnswerA,
        q.AnswerB,
        q.AnswerC,
        q.AnswerD,
        q.CorrectAnswer,
        q.Explanation,
        q.QuestionAudio,
        q.QuestionImage
    FROM 
        Questions q
    JOIN 
        @RandomGroupIDs rg
        ON q.QuestionGroupID = rg.QuestionGroupID
    WHERE 
        q.PartID = @PartID
        AND q.Level = @Level
        AND q.ExamQuestion = 1;  -- Lọc các câu hỏi có ExamQuestion = 1
END;

CREATE FUNCTION GetGroupQuestionsWithExamQuestion
(
    @PartID INT,   -- Tham số cho PartID
    @Level INT     -- Tham số cho Level
) 
RETURNS TABLE
AS
RETURN
(
    -- Truy vấn nhóm câu hỏi có câu hỏi với ExamQuestion = 1 và phù hợp với PartID và Level
    SELECT DISTINCT
        q.QuestionGroupID
    FROM
        Questions q
    WHERE
        q.ExamQuestion = 1 
        AND q.PartID = @PartID 
        AND q.Level = @Level
);


SELECT * FROM dbo.GetGroupQuestionsWithExamQuestion();



 SELECT 
                    q.QuestionID,
                    q.QuestionGroupID,
                    q.PartID,
                    q.Level,
                    q.QuestionAudio,
                    q.QuestionText,
                    q.QuestionImage,
			
                    q.AnswerA,
                    q.AnswerB,
                    q.AnswerC,
                    q.AnswerD,
                    q.CorrectAnswer,
                    q.Explanation,
                    q.ExamQuestion,
                    g.Content AS GroupContent,
                    g.Audio AS GroupAudio
                FROM ExamDetail ed
                JOIN Questions q ON ed.QuestionID = q.QuestionID
                LEFT JOIN QuestionGroup g ON q.QuestionGroupID = g.QuestionGroupID
                WHERE ed.ExamID = 'TEST01'
                ORDER BY q.PartID, q.QuestionGroupID, q.QuestionID;






