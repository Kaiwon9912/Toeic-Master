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

--Part 1--
INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion, Explanation) 
VALUES
(NULL, 1, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'They are looking at each other.', '/listen_pic_title/Part1/img/img3.jpg', 'They are looking at each other.', 'The woman is typing on a computer.', 'The man is using a computer.', 'The man is writing something in a notebook.', 'A', 0, NULL),
(NULL, 1, 2, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is working.', '/listen_pic_title/Part1/img/img4.jpg', 'One person is reading a book.', 'One person is working.', 'One person is walking.', 'One person is having lunch.', 'B', 1, NULL),
(NULL, 1, 4, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is using a computer.', '/listen_pic_title/Part1/img/img5.jpg', 'A group of people is laughing.', 'One person is talking.', 'One person is using a computer.', 'One person is looking outside.', 'C', 0, NULL),
(NULL, 1, 5, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is running.', '/listen_pic_title/Part1/img/img3.jpg', 'One person is running.', 'One person is dancing.', 'One person is walking.', 'One person is standing still.', 'A', 1, NULL),
(NULL, 1, 1, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is eating.', '/listen_pic_title/Part1/img/img4.jpg', 'One person is sleeping.', 'One person is eating.', 'One person is working.', 'One person is playing sports.', 'B', 0, NULL),
(NULL, 1, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is riding a bicycle.', '/listen_pic_title/Part1/img/img5.jpg', 'One person is driving.', 'One person is walking.', 'One person is riding a bicycle.', 'One person is waiting for a bus.', 'C', 1, NULL),
(NULL, 1, 2, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is painting.', '/listen_pic_title/Part1/img/img3.jpg', 'One person is painting.', 'One person is reading a newspaper.', 'One person is listening to music.', 'One person is talking.', 'A', 0, NULL),
(NULL, 1, 4, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is singing.', '/listen_pic_title/Part1/img/img4.jpg', 'One person is dancing.', 'One person is singing.', 'One person is doing ballet.', 'One person is sitting.', 'B', 1, NULL),
(NULL, 1, 5, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is riding a bicycle.', '/listen_pic_title/Part1/img/img5.jpg', 'One person is walking.', 'One person is running.', 'One person is riding a bicycle.', 'One person is resting.', 'C', 0, NULL),
(NULL, 1, 1, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'One person is smiling.', '/listen_pic_title/Part1/img/img3.jpg', 'One person is smiling.', 'One person is crying.', 'One person is playing.', 'One person is standing still.', 'A', 1, NULL),
(NULL, 1, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'A cat is sleeping.', '/listen_pic_title/Part1/img/img3.jpg', 'A cat is sleeping.', 'A dog is barking.', 'A bird is flying.', 'A fish is swimming.', 'A', 0, NULL),
(NULL, 1, 4, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'They are in the park.', '/listen_pic_title/Part1/img/img4.jpg', 'They are at a restaurant.', 'They are at home.', 'They are in the park.', 'They are at school.', 'C', 1, NULL),
(NULL, 1, 2, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'They are playing football.', '/listen_pic_title/Part1/img/img5.jpg', 'They are playing football.', 'They are watching a movie.', 'They are studying.', 'They are cooking.', 'A', 0, NULL),
(NULL, 1, 5, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'They are singing.', '/listen_pic_title/Part1/img/img3.jpg', 'They are dancing.', 'They are singing.', 'They are sleeping.', 'They are working.', 'B', 1, NULL),
(NULL, 1, 1, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'The child is playing.', '/listen_pic_title/Part1/img/img4.jpg', 'The man is reading.', 'The woman is cooking.', 'The child is playing.', 'The dog is barking.', 'C', 0, NULL),
(NULL, 1, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'They are riding a motorcycle.', '/listen_pic_title/Part1/img/img5.jpg', 'They are driving a car.', 'They are riding a motorcycle.', 'They are walking.', 'They are flying.', 'B', 1, NULL),
(NULL, 1, 2, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'It is sunny.', '/listen_pic_title/Part1/img/img3.jpg', 'It is sunny.', 'It is raining.', 'It is snowing.', 'It is windy.', 'A', 0, NULL),
(NULL, 1, 4, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'The train is arriving.', '/listen_pic_title/Part1/img/img4.jpg', 'The train is arriving.', 'The bus is leaving.', 'The car is parked.', 'The bike is broken.', 'A', 1, NULL),
(NULL, 1, 5, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'They are having breakfast.', '/listen_pic_title/Part1/img/img5.jpg', 'They are eating dinner.', 'They are having breakfast.', 'They are making lunch.', 'They are cleaning up.', 'B', 0, NULL),
(NULL, 1, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'The flowers are blooming.', '/listen_pic_title/Part1/img/img3.jpg', 'The flowers are blooming.', 'The leaves are falling.', 'The snow is melting.', 'The sun is setting.', 'A', 1, NULL),
(NULL, 1, 1, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'A baby is laughing.', '/listen_pic_title/Part1/img/img4.jpg', 'A child is crying.', 'A baby is laughing.', 'A dog is barking.', 'A cat is purring.', 'B', 0, NULL),
(NULL, 1, 4, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'The teacher is teaching.', '/listen_pic_title/Part1/img/img5.jpg', 'The man is painting.', 'The woman is driving.', 'The child is playing.', 'The teacher is teaching.', 'D', 1, NULL),
(NULL, 1, 2, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'They are at the museum.', '/listen_pic_title/Part1/img/img3.jpg', 'They are at the beach.', 'They are at the zoo.', 'They are at the museum.', 'They are at the concert.', 'C', 0, NULL),
(NULL, 1, 5, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'The grass is green.', '/listen_pic_title/Part1/img/img4.jpg', 'The sky is blue.', 'The grass is green.', 'The sun is hot.', 'The clouds are white.', 'B', 1, NULL),
(NULL, 1, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'They are gardening.', '/listen_pic_title/Part1/img/img5.jpg', 'They are gardening.', 'They are painting.', 'They are cleaning.', 'They are shopping.', 'A', 0, NULL),
(NULL, 1, 1, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'The game is fun.', '/listen_pic_title/Part1/img/img3.jpg', 'The movie is exciting.', 'The book is boring.', 'The game is fun.', 'The song is loud.', 'C', 1, NULL);

--Part 2--
INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion, Explanation)
VALUES 
(NULL, 2, 2, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is playing a guitar.', 'B A person is dancing.', 'C A person is painting.', 'NULL', 'A', 0, NULL),
(NULL, 2, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is jogging.', 'B A person is reading a newspaper.', 'C A person is swimming.', 'NULL', 'B', 0, NULL),
(NULL, 2, 4, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is fixing a car.', 'B A person is driving.', 'C A person is shopping.', 'NULL', 'A', 0, NULL),
(NULL, 2, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is cooking pasta.', 'B A person is washing dishes.', 'C A person is setting the table.', 'NULL', 'A', 0, NULL),
(NULL, 2, 2, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is playing soccer.', 'B A person is watching a movie.', 'C A person is studying.', 'NULL', 'C', 0, NULL),
(NULL, 2, 5, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is taking a photo.', 'B A person is cleaning the house.', 'C A person is writing a letter.', 'NULL', 'A', 0, NULL),
(NULL, 2, 4, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is playing video games.', 'B A person is listening to music.', 'C A person is working out.', 'NULL', 'B', 0, NULL),
(NULL, 2, 5, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is attending a meeting.', 'B A person is writing a report.', 'C A person is reading a book.', 'NULL', 'A', 0, NULL),
(NULL, 2, 3, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is gardening.', 'B A person is shopping online.', 'C A person is visiting a museum.', 'NULL', 'C', 0, NULL),
(NULL, 2, 2, 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'What is this person doing?', NULL, 'A A person is watching a play.', 'B A person is sleeping.', 'C A person is eating dinner.', 'NULL', 'C', 0, NULL);



--Part 3--
INSERT INTO QuestionGroup (QuestionGroupID, Audio, Content) VALUES
('Part3001', 'link_to_audio_1.mp3', 'Group 1 Content Description'),
('Part3002', 'link_to_audio_2.mp3', 'Group 2 Content Description'),
('Part3003', 'link_to_audio_3.mp3', 'Group 3 Content Description'),
('Part3004', 'link_to_audio_4.mp3', 'Group 4 Content Description'),
('Part3005', 'link_to_audio_5.mp3', 'Group 5 Content Description'),
('Part3006', 'link_to_audio_6.mp3', 'Group 6 Content Description'),
('Part3007', 'link_to_audio_7.mp3', 'Group 7 Content Description'),
('Part3008', 'link_to_audio_8.mp3', 'Group 8 Content Description'),
('Part3009', 'link_to_audio_9.mp3', 'Group 9 Content Description'),
('Part3010', 'link_to_audio_10.mp3', 'Group 10 Content Description');
INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion) 
VALUES
('Part3001', 3, 2, NULL, 'What is the woman preparing for?', '/listen_pic_title/Part3/img/img1.jpg', 'A move to a new city', 'A business trip', 'A building tour', 'A meeting with visiting colleagues', 'A', 1),
('Part3001', 3, 2, NULL, 'Who most likely is the man?', NULL, 'An accountant', 'An administrative assistant', 'A marketing director', 'A company president', 'C', 1),
('Part3001', 3, 2, NULL, 'What does the woman want to pick up on Friday morning?', NULL, 'A building map', 'A room key', 'An ID card', 'A parking pass', 'B', 1),

('Part3002', 3, 3, NULL, 'Where is the meeting taking place?', '/listen_pic_title/Part3/img/img2.jpg', 'In the main conference room', 'At the hotel', 'In a different city', 'In the cafeteria', 'A', 1),
('Part3002', 3, 3, NULL, 'What time does the meeting start?', NULL, '10 AM', '11 AM', '1 PM', '2 PM', 'A', 1),
('Part3002', 3, 3, NULL, 'Who will be attending the meeting?', NULL, 'Only the marketing team', 'All department heads', 'The CEO', 'None of the above', 'B', 1),

('Part3003', 3, 4, NULL, 'What is the main topic of discussion?', '/listen_pic_title/Part3/img/img3.jpg', 'Budget cuts', 'New project proposals', 'Employee satisfaction', 'Company policies', 'B', 0),
('Part3003', 3, 4, NULL, 'What should the attendees bring?', NULL, 'Their laptops', 'Lunch', 'Reports', 'All of the above', 'D', 0),
('Part3003', 3, 4, NULL, 'How long is the meeting expected to last?', NULL, '30 minutes', '1 hour', '2 hours', 'All day', 'B', 0),

('Part3004', 3, 2, NULL, 'What will be provided during the meeting?', '/listen_pic_title/Part3/img/img1.jpg', 'Coffee and snacks', 'Lunch only', 'No refreshments', 'Dinner', 'A', 0),
('Part3004', 3, 2, NULL, 'What happens if someone is late?', NULL, 'They will miss the presentation', 'They can join anytime', 'There will be no consequences', 'They will not be allowed in', 'A', 0),
('Part3004', 3, 2, NULL, 'Who is responsible for taking notes?', NULL, 'The intern', 'The manager', 'Everyone', 'No one', 'A', 0),

('Part3005', 3, 3, NULL, 'Where can the meeting agenda be found?', '/listen_pic_title/Part3/img/img2.jpg', 'In the shared drive', 'On the bulletin board', 'In the meeting room', 'All of the above', 'A', 0),
('Part3005', 3, 3, NULL, 'What is the purpose of the meeting?', NULL, 'To discuss performance', 'To plan a team outing', 'To review budgets', 'All of the above', 'D', 0),
('Part3005', 3, 3, NULL, 'Who is leading the meeting?', NULL, 'The head of HR', 'The CEO', 'The project manager', 'The intern', 'C', 0),

('Part3006', 3, 4, NULL, 'What technology will be used during the meeting?', '/listen_pic_title/Part3/img/img1.jpg', 'Video conferencing', 'Presentation software', 'Survey tools', 'All of the above', 'D', 0),
('Part3006', 3, 4, NULL, 'How many people are expected to attend?', NULL, '5-10', '15-20', '20-30', 'Over 30', 'C', 0),
('Part3006', 3, 4, NULL, 'What should be prepared for remote attendees?', NULL, 'A video link', 'A phone call', 'A document', 'All of the above', 'D', 0),

('Part3007', 3, 5, NULL, 'What is one key outcome expected from the meeting?', '/listen_pic_title/Part3/img/img1.jpg', 'Action items', 'Feedback', 'Updates', 'All of the above', 'D', 1),
('Part3007', 3, 5, NULL, 'How will the meeting`s results be communicated?', NULL, 'Email summary', 'Team meeting', 'Newsletter', 'All of the above', 'D', 1),
('Part3007', 3, 5, NULL, 'What should participants do after the meeting?', NULL, 'Review notes', 'Send feedback', 'Follow up on tasks', 'All of the above', 'D', 1),

('Part3008', 3, 4, NULL, 'What should you do if you can`t attend the meeting?', '/listen_pic_title/Part3/img/img2.jpg', 'Notify the organizer', 'Send a delegate', 'Request the minutes', 'All of the above', 'D', 0),
('Part3008', 3, 4, NULL, 'Which of the following is not a good practice for meetings?', NULL, 'Arriving on time', 'Interrupting others', 'Taking notes', 'Preparing in advance', 'B', 0),
('Part3008', 3, 4, NULL, 'What is a common reason for meetings to fail?', NULL, 'Lack of agenda', 'Too many attendees', 'Poor time management', 'All of the above', 'D', 0),

('Part3009', 3, 4, NULL, 'How should feedback be given during the meeting?', '/listen_pic_title/Part3/img/img1.jpg', 'Constructively', 'Negatively', 'Indifferently', 'All of the above', 'A', 1),
('Part3009', 3, 4, NULL, 'When should questions be asked?', NULL, 'During the presentation', 'At the end', 'Whenever', 'Not at all', 'B', 1),
('Part3009', 3, 4, NULL, 'Why is it important to follow up after the meeting?', NULL, 'To ensure tasks are completed', 'To gather opinions', 'To avoid misunderstandings', 'All of the above', 'D', 1),

('Part3010', 3, 5, NULL, 'What is the main objective of team-building activities?', '/images/frequency.jpg', 'Improve communication', 'Increase morale', 'Foster collaboration', 'All of the above', 'D', 1),
('Part3010', 3, 5, NULL, 'How often should team-building activities occur?', NULL, 'Quarterly', 'Monthly', 'Annually', 'As needed', 'A', 1),
('Part3010', 3, 5, NULL, 'Who organizes team-building activities?', NULL, 'HR department', 'Team leaders', 'Volunteers', 'All of the above', 'D', 1);



--Part 4--
INSERT INTO QuestionGroup (QuestionGroupID, Audio, Content) VALUES
('Part4001', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 1 Content'),
('Part4002', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 2 Content'),
('Part4003', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 3 Content'),
('Part4004', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 4 Content'),
('Part4005', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 5 Content'),
('Part4006', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 6 Content'),
('Part4007', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 7 Content'),
('Part4008', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 8 Content'),
('Part4009', 'https://storage.googleapis.com/estudyme/toeic/2024/10/08/67636425.mp3', 'Group 9 Content');
INSERT INTO Questions (QuestionGroupID, PartID, Level, QuestionAudio, QuestionText, QuestionImage, AnswerA, AnswerB, AnswerC, AnswerD, CorrectAnswer, ExamQuestion, Explanation) VALUES
('Part4001', 4, 2, NULL, '1. What is the woman preparing for?', '/path_to_image/img1.jpg', 'A move to a new city', 'A business trip', 'A building tour', 'A meeting with visiting colleagues', 'A', 1, NULL),
('Part4001', 4, 2, NULL, '2. Who most likely is the man?', NULL, 'An accountant', 'An administrative assistant', 'A marketing director', 'A company president', 'C', 1, NULL),
('Part4001', 4, 2, NULL, '3. What does the woman want to pick up on Friday morning?', NULL, 'A building map', 'A room key', 'An ID card', 'A parking pass', 'B', 1, NULL),

('Part4002', 4, 3, NULL, '1. Where is the meeting taking place?', '/path_to_image/img2.jpg', 'In the main conference room', 'At the hotel', 'In a different city', 'In the cafeteria', 'A', 0, NULL),
('Part4002', 4, 3, NULL, '2. What time does the meeting start?', NULL, '10 AM', '11 AM', '1 PM', '2 PM', 'A', 0, NULL),
('Part4002', 4, 3, NULL, '3. Who will be attending the meeting?', NULL, 'Only the marketing team', 'All department heads', 'The CEO', 'None of the above', 'B', 0, NULL),

('Part4003', 4, 4, NULL, '1. What is the main topic of discussion?', '/path_to_image/img3.jpg', 'Budget cuts', 'New project proposals', 'Employee satisfaction', 'Company policies', 'B', 1, NULL),
('Part4003', 4, 4, NULL, '2. What should the attendees bring?', NULL, 'Their laptops', 'Lunch', 'Reports', 'All of the above', 'D', 1, NULL),
('Part4003', 4, 4, NULL, '3. How long is the meeting expected to last?', NULL, '30 minutes', '1 hour', '2 hours', 'All day', 'B', 1, NULL),

('Part4004', 4, 2, NULL, '1. What will be provided during the meeting?', '/path_to_image/img4.jpg', 'Coffee and snacks', 'Lunch only', 'No refreshments', 'Dinner', 'A', 0, NULL),
('Part4004', 4, 2, NULL, '2. What happens if someone is late?', NULL, 'They will miss the presentation', 'They can join anytime', 'There will be no consequences', 'They will not be allowed in', 'A', 0, NULL),
('Part4004', 4, 2, NULL, '3. Who is responsible for taking notes?', NULL, 'The intern', 'The manager', 'Everyone', 'No one', 'A', 0, NULL),

('Part4005', 4, 3, NULL, '1. Where can the meeting agenda be found?', NULL, 'In the shared drive', 'On the bulletin board', 'In the meeting room', 'All of the above', 'A', 1, NULL),
('Part4005', 4, 3, NULL, '2. What is the purpose of the meeting?', NULL, 'To discuss performance', 'To plan a team outing', 'To review budgets', 'All of the above', 'D', 1, NULL),
('Part4005', 4, 3, NULL, '3. Who is leading the meeting?', NULL, 'The head of HR', 'The CEO', 'The project manager', 'The intern', 'C', 1, NULL),

('Part4006', 4, 4, NULL, '1. What technology will be used during the meeting?', NULL, 'Video conferencing', 'Presentation software', 'Survey tools', 'All of the above', 'D', 0, NULL),
('Part4006', 4, 4, NULL, '2. How many people are expected to attend?', NULL, '5-10', '15-20', '20-30', 'Over 30', 'C', 0, NULL),
('Part4006', 4, 4, NULL, '3. What should be prepared for remote attendees?', NULL, 'A video link', 'A phone call', 'A document', 'All of the above', 'D', 0, NULL),

('Part4007', 4, 5, NULL, '1. What is one key outcome expected from the meeting?', NULL, 'Action items', 'Feedback', 'Updates', 'All of the above', 'D', 0, NULL),
('Part4007', 4, 5, NULL, '2. How will the meeting`s results be communicated?', NULL, 'Email summary', 'Team meeting', 'Newsletter', 'All of the above', 'D', 0, NULL),
('Part4007', 4, 5, NULL, '3. What should participants do after the meeting?', NULL, 'Review notes', 'Send feedback', 'Follow up on tasks', 'All of the above', 'D', 0, NULL),

('Part4008', 4, 4, NULL, '1. What should you do if you can`t attend the meeting?', NULL, 'Notify the organizer', 'Send a delegate', 'Request the minutes', 'All of the above', 'D', 0, NULL),
('Part4008', 4, 4, NULL, '2. Which of the following is not a good practice for meetings?', NULL, 'Arriving on time', 'Interrupting others', 'Taking notes', 'Preparing in advance', 'B', 0, NULL),
('Part4008', 4, 4, NULL, '3. What is a common reason for meetings to fail?', NULL, 'Lack of agenda', 'Too many attendees', 'Poor time management', 'All of the above', 'D', 0, NULL),

('Part4009', 4, 4, NULL, '1. How should feedback be given during the meeting?', NULL, 'Constructively', 'Negatively', 'Indifferently', 'All of the above', 'A', 1, NULL),
('Part4009', 4, 4, NULL, '2. When should questions be asked?', NULL, 'During the presentation', 'At the end', 'Whenever', 'Not at all', 'B', 1, NULL),
('Part4009', 4, 4, NULL, '3. Why is it important to follow up after the meeting?', NULL, 'To ensure tasks are completed', 'To gather opinions', 'To avoid misunderstandings', 'All of the above', 'D', 1, NULL);



-- Thêm dữ liệu vào bảng Parts
INSERT INTO Parts (PartID, Title, MediaURL) VALUES 
(1, 'Part 1: Photo', 'https://youtu.be/pc3sNvK122U?si=aMA3-oXgXz6n-dhK'),
(2, 'Part 2: Details', 'https://youtu.be/0rzfRgMucaQ?si=2uLM0olK5xad4oA3'),
(3, 'Part 3: Conversations', 'https://youtu.be/EuySLyz_MBI?si=ox10zD9Bbx0uPWW5'),
(4, 'Part 4: Short Talks', 'https://youtu.be/CewLSTMFdNM?si=TMZZ2GUZKRTnzlXB'),
(5, 'Part 5: Incomplete Sentences', 'https://youtu.be/2VS_wqkhjGc?si=vKQYQUErvlz6TiJ9'),
(6, 'Part 6: Text Completion', 'https://youtu.be/uWiOyGfr2Yo?si=ANY9ycjRRAW9uJvl'),
(7, 'Part 7: Single - Double - Triple Passages', 'https://youtu.be/mogmactoZok?si=tTM66aG_4Z9xtDbA');

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
