
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

CREATE TABLE Exams (
    ExamID INT PRIMARY KEY IDENTITY(1,1),
    ExamName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    TotalQuestions INT,
    DurationInMinutes INT,
    CreatedAt DATETIME DEFAULT GETDATE()
);

GO

CREATE TABLE ExamResults (
    ResultID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ExamID INT FOREIGN KEY REFERENCES Exams(ExamID),
    Score INT,
    CompletedAt DATETIME DEFAULT GETDATE()
);

/*Nhóm câu hỏi  */
CREATE TABLE QuestionGroup(
	QuestionGroupID INT PRIMARY KEY IDENTITY(1,1),
	Audio VARCHAR(MAX),
	Content NVARCHAR(MAX),


)
CREATE TABLE Parts(
	PartID INT PRIMARY KEY,
	Title NVARCHAR(MAX)


)
CREATE TABLE Lessons (
    LessonID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,  -- Tiêu đề bài học
    Content NVARCHAR(MAX),  -- Nội dung bài học (có thể là văn bản, hoặc mô tả về tài liệu)
    MediaType NVARCHAR(50),  -- Loại media (Video, PDF, etc.)
    MediaURL NVARCHAR(255),  -- Đường dẫn tới media (URL nếu là video hoặc file)

   
);

INSERT INTO Lessons (Title, Content, MediaType, MediaURL)
VALUES (N'Từ loại - Word Forms', N'Nội dung về từ loại và cách sử dụng chúng.', 'Video', 'https://www.youtube.com/watch?v=ITk-Cp9YgLA');

/*Nhóm câu hỏi  */
CREATE TABLE Questions (
    QuestionID INT PRIMARY KEY IDENTITY(1,1),  -- ID của câu hỏi
	QuestionGroupID INT,
    PartID INT,  -- Phần của đề thi (Listening, Reading, etc.)
    Level INT,  -- Mức độ câu hỏi (dễ, trung bình, khó)
	QuestionAudio NVARCHAR(MAX),
    QuestionText NVARCHAR(MAX) NOT NULL,  -- Nội dung câu hỏi
    QuestionImage NVARCHAR(MAX),  -- Hình ảnh (nếu có) đi kèm câu hỏi
    QuestionType NVARCHAR(50),  -- Loại câu hỏi ('Listening', 'Reading', etc.)
    
    AnswerA NVARCHAR(255) NOT NULL,  -- Đáp án A
    AnswerB NVARCHAR(255) NOT NULL,  -- Đáp án B
    AnswerC NVARCHAR(255) NOT NULL,  -- Đáp án C
    AnswerD NVARCHAR(255) NOT NULL,  -- Đáp án D

    CorrectAnswer CHAR(1) NOT NULL,  -- Đáp án đúng (chỉ nhận giá trị 'A', 'B', 'C' hoặc 'D')


    ExamQuestion BIT DEFAULT 0  ,-- Câu hỏi có phải là câu hỏi trong đề thi chính thức hay không
	Explaination NVARCHAR(MAX),
	FOREIGN KEY (QuestionGroupID) REFERENCES QuestionGroup(QuestionGroupID),
    FOREIGN KEY (PartID) REFERENCES Parts(PartID)
);
ALTER TABLE Questions
ADD LessonID INT;
ALTER TABLE Questions
ADD FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID);


CREATE TABLE Topics (
    TopicID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
);



CREATE TABLE Vocabulary (
    WordID INT PRIMARY KEY IDENTITY(1,1),
    Word VARCHAR(100) NOT NULL,
    Translation NVARCHAR(100) NOT NULL,
    TopicID INT,
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



CREATE TABLE User_Lessons (
    LessonID INT,
    UserID INT,
    Status BIT DEFAULT 0,
    Score INT,  
    Completed_at DATETIME DEFAULT GETDATE(),
	PRIMARY KEY (UserID, LessonID),  
    FOREIGN KEY (UserID) REFERENCES Users(UserID), 
    FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID)  
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
    GROUP BY 
        Q.PartID, P.Title
);

-- Thay 1 bằng UserID bạn muốn kiểm tra
SELECT * FROM GetUserQuestionStats(1);  

--Lấy các GroupQuestion
CREATE PROCEDURE GetRandomQuestionsByPart
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
        Q.Explaination,
        G.Content
    FROM 
        Questions Q
    JOIN 
        QuestionGroup G ON Q.QuestionGroupID = G.QuestionGroupID
    WHERE 
        Q.QuestionGroupID = (SELECT QuestionGroupID FROM RandomGroup);
END;


EXEC GetRandomQuestionsByPart @PartID = 6;


-- Thêm các chủ đề từ vựng
INSERT INTO Topics (Name) VALUES 
(N'Travel'), 
(N'Business'), 
(N'Education'), 
(N'Environment');

-- Thêm từ vựng cho chủ đề 'Travel'
INSERT INTO Vocabulary (Word, Translation, TopicID) VALUES 
('Airport', N'Sân bay', 1),
('Baggage', N'Hành lý', 1),
('Boarding pass', N'Thẻ lên máy bay', 1),
('Check-in', N'Kiểm tra', 1),
('Delay', N'Sự trì hoãn', 1),
('Departure', N'Khởi hành', 1),
('Destination', N'Điểm đến', 1),
('Flight', N'Chuyến bay', 1),
('Luggage', N'Hành lý', 1),
('Passenger', N'Hành khách', 1);

-- Thêm từ vựng cho chủ đề 'Business'
INSERT INTO Vocabulary (Word, Translation, TopicID) VALUES 
('Agreement', N'Thỏa thuận', 2),
('Client', N'Khách hàng', 2),
('Contract', N'Hợp đồng', 2),
('Meeting', N'Cuộc họp', 2),
('Negotiation', N'Thương lượng', 2),
('Offer', N'Đề nghị', 2),
('Proposal', N'Đề xuất', 2),
('Revenue', N'Doanh thu', 2),
('Strategy', N'Chiến lược', 2),
('Supply', N'Cung cấp', 2);

-- Thêm từ vựng cho chủ đề 'Education'
INSERT INTO Vocabulary (Word, Translation, TopicID) VALUES 
('Assignment', N'Nhiệm vụ', 3),
('Curriculum', N'Chương trình học', 3),
('Degree', N'Bằng cấp', 3),
('Dissertation', N'Luận văn', 3),
('Exam', N'Kỳ thi', 3),
('Lecture', N'Bài giảng', 3),
('Research', N'Nghiên cứu', 3),
('Scholarship', N'Học bổng', 3),
('Subject', N'Môn học', 3),
('Tuition', N'Học phí', 3);

-- Thêm từ vựng cho chủ đề 'Environment'
INSERT INTO Vocabulary (Word, Translation, TopicID) VALUES 
('Climate', N'Khí hậu', 4),
('Conservation', N'Bảo tồn', 4),
('Deforestation', N'Nạn phá rừng', 4),
('Ecosystem', N'Hệ sinh thái', 4),
('Environment', N'Môi trường', 4),
('Pollution', N'Ô nhiễm', 4),
('Recycling', N'Tái chế', 4),
('Sustainability', N'Bền vững', 4),
('Waste', N'Rác thải', 4),
('Wildlife', N'Động vật hoang dã', 4);


-- Insert users into the Users table
INSERT INTO Users (Username, PasswordHash, FullName, Email, Role)
VALUES
-- User 1
(N'user1', '1', N'Nguyen Van A', N'user1@gmail.com', 0)

INSERT INTO Parts(PartID,Title)
VALUES

(1, N'Mô tả hình ảnh'),
(2, N'Hỏi đáp'),
(3, N'Đoạn hội thội'),
(4, N'Bài nói chuyện ngắn'),
(5, N'Điền vào câu'),
(6, N'Điền vào đoạn văn'),
(7, N'Đọc hiểu đoạn văn')



-- Insert 10 questions for Part 5 with Explanation in Vietnamese
INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, QuestionType, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion, Explaination)
VALUES
(NULL, 5, 1, NULL, 'The new software update _____ available next week.', NULL, 'Reading', 'is', 'are', 'was', 'were', 'A', 1, N'Động từ "is" phù hợp với chủ ngữ và thì hiện tại đơn.'),
(NULL, 5, 1, NULL, 'She _____ to the meeting yesterday.', NULL, 'Reading', 'go', 'went', 'gone', 'going', 'B', 1, N'Thì quá khứ của "go" là "went".'),
(NULL, 5, 2, NULL, 'The report will be sent _____ email tomorrow.', NULL, 'Reading', 'by', 'on', 'in', 'via', 'D', 1, N'"via" là giới từ đúng để chỉ việc gửi qua email.'),
(NULL, 5, 2, NULL, 'Our team has successfully _____ the project ahead of schedule.', NULL, 'Reading', 'complete', 'completed', 'completes', 'completing', 'B', 1, '"completed" là dạng đúng để phù hợp với "has".'),
(NULL, 5, 3, NULL, 'We look forward to _____ from you soon.', NULL, 'Reading', 'hear', 'heard', 'hearing', 'hears', 'C', 1, N'Cụm từ "look forward to" đi kèm với dạng gerund "hearing".'),
(NULL, 5, 3, NULL, 'The manager requested that the report _____ by Monday.', NULL, 'Reading', 'is finished', 'be finished', 'finished', 'finishes', 'B', 1, N'"be finished" là đúng trong câu sử dụng mood giả định này.'),
(NULL, 5, 1, NULL, 'The meeting will start _____ 10 AM.', NULL, 'Reading', 'in', 'on', 'at', 'from', 'C', 1, N'"at" là giới từ đúng cho thời gian trong ngữ cảnh này.'),
(NULL, 5, 2, NULL, 'Please make sure to _____ all documents before the deadline.', NULL, 'Reading', 'submits', 'submit', 'submitted', 'submitting', 'B', 1, N'Dạng nguyên thể "submit" theo sau "make sure to".'),
(NULL, 5, 3, NULL, 'Each employee must _____ the training within one month.', NULL, 'Reading', 'complete', 'completes', 'completed', 'completing', 'A', 1, N'"complete" là đúng vì theo sau "must" là dạng nguyên thể.'),
(NULL, 5, 2, NULL, 'The product has been _____ as per customer feedback.', NULL, 'Reading', 'modify', 'modifying', 'modified', 'modifies', 'C', 1, N'"modified" là dạng phân từ quá khứ đúng trong ngữ cảnh này.');

-- Insert data for Part 6, Passage 1
INSERT INTO QuestionGroup (Content, Type) VALUES 
('Subject: BiggsGraphics Collaboration\nI am Sharron Biggs, CEO and founder of BiggsGraphics. I recently came across your advertisement (1) _____ partnership with a graphic design company for various projects. BiggsGraphics has (2) _____ experience working with businesses in designing campaigns, logos, and websites. (3) _____ Our website, www.biggs-graphics.com, has more information about us.', 'Reading');

DECLARE @GroupID1 INT = (SELECT MAX(QuestionGroupID) FROM QuestionGroup);

INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, QuestionType, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion, Explanation)
VALUES
(@GroupID1, 6, 1, NULL, 'Advertisement (1) _____ partnership with a graphic design company.', NULL, 'Reading', 'for', 'about', 'regarding', 'toward', 'C', 1, 'NThe correct choice is "regarding" to complete the sentence meaningfully.'),
(@GroupID1, 6, 2, NULL, 'BiggsGraphics has (2) _____ experience working with businesses.', NULL, 'Reading', 'several', 'minimal', 'extensive', 'small', 'C', 1, N'The correct answer is "extensive" as it fits best in this context.'),
(@GroupID1, 6, 2, NULL, 'Our website (3) _____ more information about us.', NULL, 'Reading', 'provide', 'provides', 'providing', 'provided', 'B', 1, N'The word "provides" is grammatically correct here.');


-- Insert data for Part 6, Passage 2
INSERT INTO QuestionGroup (Content, Type) VALUES 
('Dear Customer, thank you for choosing our service. Your feedback (1) _____ a vital role in our improvements. We are happy to incorporate your suggestions (2) _____ they enhance our offerings. Please continue sharing your thoughts with us.', 'Reading');

DECLARE @GroupID2 INT = (SELECT MAX(QuestionGroupID) FROM QuestionGroup);

INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, QuestionType, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion, Explanation)
VALUES
(@GroupID2, 6, 1, NULL, 'Your feedback (1) _____ a vital role in our improvements.', NULL, 'Reading', 'play', 'plays', 'played', 'will play', 'B', 1, 'The correct answer is "plays" for proper tense and context.'),
(@GroupID2, 6, 2, NULL, 'We are happy to incorporate your suggestions (2) _____ they enhance our offerings.', NULL, 'Reading', 'if', 'and', 'but', 'or', 'A', 1, 'The correct answer is "if" as it sets a conditional context.'),
(@GroupID2, 6, 1, NULL, 'Please continue sharing your thoughts with us.', NULL, 'Reading', 'frequently', 'as always', 'with pleasure', 'accordingly', 'B', 1, 'The answer "as always" encourages consistent feedback.');


INSERT INTO Questions 
    (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, QuestionType, 
     AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion, Explaination, LessonID)
VALUES 
    (1, 5, 1, NULL, 'What is the correct form of the verb "to have" in the present simple for "he"?', 
     NULL, 'Grammar', 
     'has', 'have', 'had', 'having', 'A', 0, 'The correct form is "has" for "he".', 2),
    (1, 5, 1, NULL, 'Which word is an adverb?', 
     NULL, 'Vocabulary', 
     'quickly', 'quick', 'quicker', 'quickness', 'A', 0, 'The word "quickly" describes how an action is performed.', 2),
    (1, 5, 1, NULL, 'What is the plural form of "child"?', 
     NULL, 'Grammar', 
     'children', 'childs', 'childes', 'child', 'A', 0, 'The plural form is "children".', 2),
    (1, 5, 1, NULL, 'Choose the correct adjective: "The weather is very ___ today."', 
     NULL, 'Vocabulary', 
     'hot', 'heat', 'heating', 'hottest', 'A', 0, 'The correct word is "hot".', 2),
    (1, 5, 1, NULL, 'Which of the following is a noun?', 
     NULL, 'Vocabulary', 
     'happiness', 'happy', 'happily', 'happier', 'A', 0, 'The word "happiness" is a noun.', 2),
    (1, 5, 1, NULL, 'What is the past tense of "write"?', 
     NULL, 'Grammar', 
     'wrote', 'written', 'writing', 'write', 'A', 0, 'The past tense is "wrote".', 2),
    (1, 5, 1, NULL, 'Which word is the superlative form of "small"?', 
     NULL, 'Vocabulary', 
     'smallest', 'smaller', 'least small', 'more small', 'A', 0, 'The superlative form is "smallest".', 2),
    (1, 5, 1, NULL, 'Choose the correct form of the verb: "They ___ to school every day."', 
     NULL, 'Grammar', 
     'go', 'goes', 'gone', 'going', 'A', 0, 'The correct form is "go".', 2),
    (1, 5, 1, NULL, 'What is the antonym of "happy"?', 
     NULL, 'Vocabulary', 
     'sad', 'joyful', 'cheerful', 'sorrowful', 'A', 0, 'The antonym is "sad".', 2),
    (1, 5, 1, NULL, 'Which word is a preposition?', 
     NULL, 'Vocabulary', 
     'under', 'undermine', 'understanding', 'understood', 'A', 0, 'The word "under" is a preposition.', 2);
