
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

CREATE TABLE Parts(
	PartID INT PRIMARY KEY,
	Title NVARCHAR(MAX)
)
CREATE TABLE ExamDetails (
    ExamDetailID INT PRIMARY KEY IDENTITY(1,1),
    ExamID INT,  -- ID của bài thi
    PartID INT,  -- ID của Part (Listening, Reading, etc.)
    NumberOfQuestions INT NOT NULL,  -- Số câu hỏi cho Part này
    FOREIGN KEY (ExamID) REFERENCES Exams(ExamID),
    FOREIGN KEY (PartID) REFERENCES Parts(PartID)
);

CREATE TABLE ExamResults (
    ResultID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ExamID INT FOREIGN KEY REFERENCES Exams(ExamID),
    Score INT,
    CompletedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE QuestionGroup(
	QuestionGroupID VARCHAR(255) PRIMARY KEY,
	Audio VARCHAR(MAX),
	Content NVARCHAR(MAX),


)
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


CREATE TABLE Lessons (
    LessonID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,  -- Tiêu đề bài học
    Content NVARCHAR(MAX),  -- Nội dung bài học (có thể là văn bản, hoặc mô tả về tài liệu)
    MediaType NVARCHAR(50),  -- Loại media (Video, PDF, etc.)
    MediaURL NVARCHAR(255),  -- Đường dẫn tới media (URL nếu là video hoặc file)

   
);




CREATE TABLE Topics (
    TopicID VARCHAR(10) PRIMARY KEY,
	Image VARCHAR(MAX),
    Name NVARCHAR(100) NOT NULL,
);



CREATE TABLE Vocabulary (
    WordID INT PRIMARY KEY IDENTITY(1,1),
    Word VARCHAR(100) NOT NULL,
    Translation NVARCHAR(100) NOT NULL,
    TopicID VARCHAR(10),
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
	WHERE ExamQuestion =0
    GROUP BY 
        Q.PartID, P.Title
);

-- Thay 1 bằng UserID bạn muốn kiểm tra
SELECT * FROM GetUserQuestionStats(1);  

CREATE PROCEDURE GetRandomGroupByPart
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

EXEC GetRandomGroupByPart @PartID = 6;

-- Thêm các chủ đề từ vựng
delete from Topics 

INSERT INTO Topics (TopicID,Name, Image ) VALUES 
('TP01', N'Travel', 'travel.jpg'), 
('TP02',N'Business', 'business.jpg'), 
('TP03',N'Education', 'education.jpg'), 
('TP04',N'Environment','enviroment.jpg');

-- Thêm từ vựng cho chủ đề 'Travel'
INSERT INTO Vocabulary (Word, Translation, TopicID) VALUES 
('Airport', N'Sân bay', 'TP01'),
('Baggage', N'Hành lý',  'TP01'),
('Boarding pass', N'Thẻ lên máy bay',  'TP01'),
('Check-in', N'Kiểm tra',  'TP01'),
('Delay', N'Sự trì hoãn',  'TP01'),
('Departure', N'Khởi hành',  'TP01'),
('Destination', N'Điểm đến',  'TP01'),
('Flight', N'Chuyến bay',  'TP01'),
('Luggage', N'Hành lý',  'TP01'),
('Passenger', N'Hành khách',  'TP01');

-- Thêm từ vựng cho chủ đề 'Business'
INSERT INTO Vocabulary (Word, Translation, TopicID) VALUES 
('Agreement', N'Thỏa thuận',  'TP02'),
('Client', N'Khách hàng',  'TP02'),
('Contract', N'Hợp đồng',  'TP02'),
('Meeting', N'Cuộc họp',  'TP02'),
('Negotiation', N'Thương lượng',  'TP02'),
('Offer', N'Đề nghị',  'TP02'),
('Proposal', N'Đề xuất',  'TP02'),
('Revenue', N'Doanh thu',  'TP02'),
('Strategy', N'Chiến lược',  'TP02'),
('Supply', N'Cung cấp',  'TP02');

-- Thêm từ vựng cho chủ đề 'Education'
INSERT INTO Vocabulary (Word, Translation, TopicID) VALUES 
('Assignment', N'Nhiệm vụ',  'TP03'),
('Curriculum', N'Chương trình học', 'TP03'),
('Degree', N'Bằng cấp', 'TP03'),
('Dissertation', N'Luận văn', 'TP03'),
('Exam', N'Kỳ thi', 'TP03'),
('Lecture', N'Bài giảng', 'TP03'),
('Research', N'Nghiên cứu', 'TP03'),
('Scholarship', N'Học bổng', 'TP03'),
('Subject', N'Môn học', 'TP03'),
('Tuition', N'Học phí', 'TP03');

-- Thêm từ vựng cho chủ đề 'Environment'
INSERT INTO Vocabulary (Word, Translation, TopicID) VALUES 
('Climate', N'Khí hậu', 'TP04'),
('Conservation', N'Bảo tồn', 'TP04'),
('Deforestation', N'Nạn phá rừng', 'TP04'),
('Ecosystem', N'Hệ sinh thái', 'TP04'),
('Environment', N'Môi trường', 'TP04'),
('Pollution', N'Ô nhiễm', 'TP04'),
('Recycling', N'Tái chế', 'TP04'),
('Sustainability', N'Bền vững', 'TP04'),
('Waste', N'Rác thải', 'TP04'),
('Wildlife', N'Động vật hoang dã', 'TP04');


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




-- Thêm dữ liệu vào bảng QuestionGroup với QuestionGroupID là 'Part6'
INSERT INTO QuestionGroup (QuestionGroupID, Audio, Content)
VALUES ('PART6001', NULL, 'To: samsmith@digitallT.com<br/>From: sharronb@email.com<br/>Date: September 24<br/>Subject: Business Contract<br/><br/>Dear Mr. Smith,<br/>I am Sharron Biggs, CEO and founder of BiggsGraphics. I recently came across your advertisement (1) _____ partnership of a graphic design company for a number of your projects. BiggsGraphics has (2) _____ experience working with various small businesses and companies in designing advertising campaigns, logos, and websites. (3) _____ Our website www.biggs-graphics.com also has some information about our company.<br/><br/>I’m interested in working with your company on your projects and hope we can build a beneficial partnership. I look forward (4) _____ your reply.<br/><br/>Sincerely, Sharron Biggs<br/>CEO, BiggsGraphics');

-- Thêm dữ liệu vào bảng Questions cho các câu hỏi với QuestionGroupID là 'Part6'
INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion, Explanation)
VALUES 
('PART6001', 6, 1, NULL, 'I recently came across your advertisement (1) _____ partnership of a graphic design company for a number of your projects.', NULL, 'seek', 'to seek', 'seeking', 'are seeking', 'C', 0, N'Đây là câu mệnh đề rút gọn. Câu đầy đủ là "I recently came across your advertisement which sought partnership of a graphic company for a number of your projects."'),

('PART6001', 6, 1, NULL, 'BiggsGraphics has (2) _____ experience working with various small businesses and companies in designing advertising campaigns, logos, and websites.', NULL, 'extensive', 'restricted', 'generous', 'limitless', 'A', 0, N'Dựa vào ngữ cảnh, "extensive" (phong phú, nhiều) là đáp án đúng.'),

('PART6001', 6, 1, NULL, '(3) _____ Our website www.biggs-graphics.com also has some information about our company.', NULL, 'I would really appreciate the opportunity to work with you.', 'I heard that Digital IT is a great company.', 'In fact, our designs are often copied by other companies.', 'I have attached a number of our past designs to illustrate what we specialize in.', 'D', 0, N'Dựa vào ngữ cảnh câu, đáp án D là hợp lý.'),

('PART6001', 6, 1, NULL, 'I look forward (4) _____ your reply.', NULL, 'at', 'to', 'with', 'from', 'B', 0, 'Cấu trúc: "look forward to" + Ving hoặc danh từ.');



EXEC GetRandomGroupByPart @PartID = 6;
