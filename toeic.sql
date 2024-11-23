
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


CREATE TABLE ExamDetails (
    ExamDetailID INT PRIMARY KEY IDENTITY(1,1),
    ExamID INT,  -- ID của bài thi
    NumberOfQuestions INT NOT NULL,  -- Số câu hỏi cho Part này
    FOREIGN KEY (ExamID) REFERENCES Exams(ExamID),
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


CREATE TABLE Parts(
	PartID INT PRIMARY KEY,
	Title NVARCHAR(MAX)
)

CREATE TABLE Lessons (
    LessonID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,  -- Tiêu đề bài học
    Content NVARCHAR(MAX),  -- Nội dung bài học (có thể là văn bản, hoặc mô tả về tài liệu)
	QuestionType NVARCHAR(MAX),
	Guide NVARCHAR(MAX),
	PartID int,
	FOREIGN KEY (PartID) REFERENCES Parts(PartID)
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





-- Thêm dữ liệu vào bảng Parts
INSERT INTO Parts (PartID, Title) VALUES 
(1, 'Part 1: Photo'),
(2, 'Part 2: Details'),
(3, 'Part 3: Conversations'),
(4, 'Part 4: Short Talks'),
(5, 'Part 5: Incomplete Sentences'),
(6, 'Part 6: Text Completion'),
(7, 'Part 7: Single - Double - Triple Passages');

-- Thêm dữ liệu vào bảng Lessons
INSERT INTO Lessons (Title, Content, QuestionType, Guide, PartID) VALUES 
-- Part 1: Photo
('Lesson 1: Predict what you will hear', 
 'In this part, you are asked to see a picture and choose the statement that most describes the picture. To be able to choose the correct answer, you should think of the topic of the picture and possible statements.', 
 'In this part, you are asked to see a picture.', 
 'Before the beginning of the section, think of the theme of the picture as well as brainstorm nouns and verbs related to the picture.', 
 1),
('Lesson 2: Listen for correct verb', 
 'In this part, you are asked to see a picture and choose the statement that most describes the picture. To earn a maximum score in this part, you need to choose the sentence with the verb that best describes what is seen in the picture.', 
 'In this part, you are asked to see a picture.', 
 'Listen carefully to check that the verb relates to the picture.', 
 1),
('Lesson 3: Listen for details', 
 'In this part, you are asked to look at a picture and choose the statement that most describes the picture. To attain a higher score in this part, you need to listen to every detail as most incorrect choices in this part will use some correct subject, verb, and object words and some wrong ones.', 
 'In this part, you are asked to look at a picture.', 
 'Listen for SVO words: Most TOEIC Part 1 questions follow a subject, verb or subject, verb, object pattern (SVO).', 
 1),
('Lesson 4: Listen for prepositions and similar sounds', 
 'In this section, your understanding of position and direction will be tested. To gain a higher score in this part, you need to be familiar with the words used to describe where things are and where they are going which will help you score well in this part of the test.', 
 'In this section, understanding of position and direction will be tested.', 
 'Listen for prepositions: Many statements in TOEIC Part 1 talk about the position of people or objects in the picture.', 
 1),

-- Part 2: Details
('Lesson 1: Answering direct questions', 
 'In this part of the test, you will often hear direct questions. The correct answer will not usually be an answer with ''Yes'', ''No'', or ''Don''t know'', and will often be in a different tense.', 
 'In this part of the test, you often hear direct questions.', 
 'Direct questions are rarely answered with ''Yes'', ''No'', or ''Don''t know''.', 
 2),
('Lesson 2: Time and location structures', 
 'In this part of the test, you are asked to choose the correct responses to questions about time and location, which are common in the TOEIC test. ''Where'' questions often contain the word ''where'', while ''When'' questions often involve phrases like ''How long'', ''When'', and ''What time''.', 
 'In this part of the test, you answer questions about time and location.', 
 'Answers to time and location questions often use common marker words.', 
 2),
('Lesson 3: Listen for details', 
 'In this part, you are asked to look at a picture and choose the statement that most describes the picture. To attain a higher score in this part, you need to listen to every detail as most incorrect choices in this part will use some correct subject, verb, and object words and some wrong ones.', 
 'In this part, you are asked to look at a picture.', 
 'Listen for SVO words: Most TOEIC Part 1 questions follow a subject, verb, or subject, verb, object pattern.', 
 2),
('Lesson 4: Dealing with factual questions', 
 'With this kind of question, you are asked to choose the correct responses to factual questions. Think carefully about what the question is actually asking for. Some answers may closely relate to the topic in the question, but not answer it directly.', 
 'In this part, you answer factual questions.', 
 'Answers in the TOEIC test do not always answer the question directly.', 
 2),

-- Part 3: Conversations
('Lesson 1: Skimming to predict context before listening', 
 'In this part of the test, you should skim the questions and answer choices to predict what you are going to hear.', 
 'In this part, you skim the questions and answer choices.', 
 'Use the time before listening to predict the context.', 
 3),
('Lesson 2: Word distractors', 
 'In this part of the test, the recording can often use words that are the same or have the same meaning as words in the answer choices. This may cause you to choose an incorrect answer. Be careful not to choose an answer simply because you heard something similar in the listening.', 
 'In this part, be careful with distracting words.', 
 'The TOEIC Part 3 sometimes uses the same words in the recording and answer choices, but with a different meaning.', 
 3),
('Lesson 3: Using vocabulary clues', 
 'The answers to many of the questions in this part of the test are not stated directly. You will have to listen carefully and use your knowledge of related vocabulary and context to choose many of the answers.', 
 'In this part, you use vocabulary clues.', 
 'Sometimes the answers are not stated directly in the passage.', 
 3),
('Lesson 4: Saying ''No'' and first exchange', 
 'In some recordings in the TOEIC Part 3, you will encounter negative responses. Being familiar with the language and organization common to negative responses can help you to choose the correct answer. It is also important to understand the first exchange, as this probably contains the answer to the first question.', 
 'In this part, you encounter negative responses.', 
 'Conversations involving saying ''no'' sometimes appear in the TOEIC test.', 
 3),

-- Part 4: Short Talks
('Lesson 1: Skimming to predict context before listening', 
 'Before listening, you should skim the questions and answer choices to predict what you are going to hear as well as to identify the key parts of the talk.', 
 'In this part, you skim questions and answer choices.', 
 'The TOEIC test often uses different words in the answer choices and the recording.', 
 4),
('Lesson 2: Word distractors', 
 'In this part of the test, the recording can often use words that are the same or have the same meaning as words in the answer choices. This may cause you to choose an incorrect answer. Be careful not to choose an answer simply because you heard something similar in the listening.', 
 'In this part, be careful with distracting words.', 
 'The TOEIC Part 4 sometimes uses the same words in the recording and answer choices, but with a different meaning.', 
 4),
('Lesson 3: Restatement/ Questions with numbers and quantities', 
 'In this part of the test, you are required to answer questions with numbers and quantities. In addition, you need to familiarize yourself with restatements.', 
 'In this part, you answer questions with numbers and quantities.', 
 'The correct answer choice often uses different words from what you will hear.', 
 4),
('Lesson 4: Saying ''No'' and first exchange', 
 'In some recordings in the TOEIC Part 4, you will encounter negative responses. Being familiar with the language and organization common to negative responses can help you to choose the correct answer. It is also important to understand the first exchange, as this probably contains the answer to the first question.', 
 'In this part, you encounter negative responses.', 
 'Conversations involving saying ''no'' sometimes appear in the TOEIC test.', 
 4),

-- Part 5: Incomplete Sentences
('Lesson 1: Part of speech', 
 'This part consists of multiple-choice questions. Some questions ask you to choose the correct option to fill in the blank by identifying the correct part of speech of the word needed.', 
 'This part consists of multiple-choice questions.', 
 'Decide what part of speech (adjectives, adverbs, noun, verb) is needed. There are some tips to identify the part of speech needed. For example, use suffixes (word endings) to help identify the part of speech.\nE.g: -ed/ -ing/ -ful/ -le (adj), -ly (adv), -ment (N).\nFind the answer choice of the correct type. Once you know what you are looking for, skim the answer choices to find it.', 
 5),
('Lesson 2: Gerunds & Infinitives', 
 'This part requires you to choose the correct answer to fill in the blank by determining whether the blank is in the “gerund” or “infinitive” forms.', 
 'This part requires you to choose the correct answer.', 
 'Look at the verb in the question to decide whether a gerund or an infinitive is needed in the answer.\nFind the answer choice of the correct type.\nWhen preparing for the exam, familiarize yourself with common phrases that include gerunds and infinitives.', 
 5),
('Lesson 3: Suffixes and Prefixes', 
 'In this part, you are asked to choose the word which contains the correct form of prefix or suffix to fill in the blank.', 
 'This part requires you to choose the correct prefix or suffix.', 
 'Learning common prefixes can help you guess the meaning of words you do not know. For example, the prefix “il” is often used before words beginning with “L” (E.g: illegal, illegible). The prefix “im” is often used before words beginning with “B, P, and M” (E.g: imbalanced, impossible, immeasurable).\nLearning common suffixes can help you to identify nouns and verbs.', 
 5),
('Lesson 4: Pronouns', 
 'This section requires you to select the correct type of pronoun from four options A, B, C, D to fill in the blank.', 
 'This section requires you to select the correct type of pronoun.', 
 'Identify which type of pronoun is needed in the blank.\nFor personal pronouns, if the blank replaces a subject, it is a subject pronoun (I, She, He, etc). If the blank replaces an object, it is an object pronoun (me, him, her).\nFor possessives, if the blank modifies a noun, it is a possessive adjective (my, your, our, etc). If the blank replaces a noun, it is a possessive pronoun (mine, yours, ours, etc).', 
 5),

-- Part 6: Text Completion
('Lesson 1: Using context to choose the correct verb form', 
 'In this section, you will be asked to choose the correct form of the verb by using the context of the sentence or the whole passage.', 
 'In this section, you will be asked to choose the correct verb form.', 
 'Look at the sentence (and the rest of the passage if necessary) to decide what tense is needed.\nChoose the correct option.', 
 6),
('Lesson 2: Choosing correct part of speech', 
 'This part asks you to choose the correct answer to fill in the blank by identifying which part of speech is required.', 
 'This part asks you to choose the correct answer.', 
 'Look at the question and decide what part of speech is needed. Use suffixes to determine what part of speech is needed.', 
 6),
('Lesson 3: Using clues to choose correct verb form', 
 'In this section, you are asked to select the correct verb form to fill in the blank by using the clues in the sentence and the passage.', 
 'In this section, you are asked to select the correct verb form.', 
 'Based on signals in the question as well as the rest of the text to choose the correct form.', 
 6),
('Lesson 4: Prepositions & Conjunctions', 
 'This part asks you to choose the correct answer to fill in the blank by identifying which preposition or conjunction is needed.', 
 'This part asks you to choose the correct answer.', 
 'With sentences asking to choose the correct prepositions, familiarize yourself with the ways prepositions are commonly used. This will help you eliminate wrong answers quickly.', 
 6),

-- Part 7: Single - Double - Triple Passages
('Lesson 1: Scanning', 
 'In this section, you are asked to read different passages and then answer specific information questions related to them by using the technique of scanning.', 
 'In this section, you are asked to read different passages.', 
 'Read questions and underline the keywords.\nScan the passage to look for the information needed.', 
 7),
('Lesson 2: Answering vocabulary questions and inferring the meaning', 
 'You have to read different passages and then answer vocabulary, main idea, and inference questions related to these passages.', 
 'You have to read different passages.', 
 'With vocabulary questions, read the sentences around the target word to try to guess the meaning.', 
 7),
('Lesson 3: Answering ''NOT'' questions, questions with names, numbers, dates and time', 
 '- With “NOT” questions, you are asked to select the answer which is not true or mentioned.\n- With questions with names, numbers, dates and times, you are required to choose the correct options.', 
 '- With “NOT” questions, select the answer which is not true.', 
 'Leave "NOT" questions to last: Answering the other questions may help you to answer "NOT" questions.', 
 7),
('Lesson 4: Dealing with charts, tables, forms and double, triple passages', 
 'In this section, you will be asked to answer questions related to charts, tables or forms. You also must deal with questions involving double and triple passages.', 
 'In this section, you will be asked to answer questions related to charts, tables or forms.', 
 'With questions involving charts, tables and forms, you need to understand parts of charts, tables and forms.', 
 7);
