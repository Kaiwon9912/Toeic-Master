


USE ToeicData 






INSERT INTO Topics (TopicID,Name ) VALUES 
('TP01', N'Travel'), 
('TP02',N'Business'), 
('TP03',N'Education'), 
('TP04',N'Environment');

-- Thêm từ vựng cho chủ đề 'Travel'
INSERT INTO Vocabulary (Word, Translation, TopicID, Image) VALUES 
('Airport', N'Sân bay', 'TP01', 'https://example.com/airport.jpg'), -- Thay thế bằng hình ảnh thực tế
('Baggage', N'Hành lý', 'TP01', 'https://example.com/baggage.jpg'), -- Thay thế bằng hình ảnh thực tế
('Boarding pass', N'Thẻ lên máy bay', 'TP01', 'https://example.com/boarding_pass.jpg'), -- Thay thế bằng hình ảnh thực tế
('Check-in', N'Kiểm tra', 'TP01', 'https://example.com/checkin.jpg'), -- Thay thế bằng hình ảnh thực tế
('Delay', N'Sự trì hoãn', 'TP01', 'https://example.com/delay.jpg'), -- Thay thế bằng hình ảnh thực tế
('Departure', N'Khởi hành', 'TP01', 'https://example.com/departure.jpg'), -- Thay thế bằng hình ảnh thực tế
('Destination', N'Điểm đến', 'TP01', 'https://example.com/destination.jpg'), -- Thay thế bằng hình ảnh thực tế
('Flight', N'Chuyến bay', 'TP01', 'https://example.com/flight.jpg'), -- Thay thế bằng hình ảnh thực tế
('Luggage', N'Hành lý', 'TP01', 'https://example.com/luggage.jpg'), -- Thay thế bằng hình ảnh thực tế
('Passenger', N'Hành khách', 'TP01', 'https://example.com/passenger.jpg'); -- Thay thế bằng hình ảnh thực tế

-- Thêm từ vựng cho chủ đề 'Business'
INSERT INTO Vocabulary (Word, Translation, TopicID, Image) VALUES 
('Agreement', N'Thỏa thuận', 'TP02', 'https://example.com/agreement.jpg'),
('Client', N'Khách hàng', 'TP02', 'https://example.com/client.jpg'),
('Contract', N'Hợp đồng', 'TP02', 'https://example.com/contract.jpg'),
('Meeting', N'Cuộc họp', 'TP02', 'https://example.com/meeting.jpg'),
('Negotiation', N'Thương lượng', 'TP02', 'https://example.com/negotiation.jpg'),
('Offer', N'Đề nghị', 'TP02', 'https://example.com/offer.jpg'),
('Proposal', N'Đề xuất', 'TP02', 'https://example.com/proposal.jpg'),
('Revenue', N'Doanh thu', 'TP02', 'https://example.com/revenue.jpg'),
('Strategy', N'Chiến lược', 'TP02', 'https://example.com/strategy.jpg'),
('Supply', N'Cung cấp', 'TP02', 'https://example.com/supply.jpg');

-- Thêm từ vựng cho chủ đề 'Education'
INSERT INTO Vocabulary (Word, Translation, TopicID, Image) VALUES 
('Assignment', N'Nhiệm vụ', 'TP03', 'https://example.com/assignment.jpg'),
('Curriculum', N'Chương trình học', 'TP03', 'https://example.com/curriculum.jpg'),
('Degree', N'Bằng cấp', 'TP03', 'https://example.com/degree.jpg'),
('Dissertation', N'Luận văn', 'TP03', 'https://example.com/dissertation.jpg'),
('Exam', N'Kỳ thi', 'TP03', 'https://example.com/exam.jpg'),
('Lecture', N'Bài giảng', 'TP03', 'https://example.com/lecture.jpg'),
('Research', N'Nghiên cứu', 'TP03', 'https://example.com/research.jpg'),
('Scholarship', N'Học bổng', 'TP03', 'https://example.com/scholarship.jpg'),
('Subject', N'Môn học', 'TP03', 'https://example.com/subject.jpg'),
('Tuition', N'Học phí', 'TP03', 'https://example.com/tuition.jpg');

-- Thêm từ vựng cho chủ đề 'Environment'
INSERT INTO Vocabulary (Word, Translation, TopicID, Image) VALUES 
('Climate', N'Khí hậu', 'TP04', 'https://example.com/climate.jpg'),
('Conservation', N'Bảo tồn', 'TP04', 'https://example.com/conservation.jpg'),
('Deforestation', N'Nạn phá rừng', 'TP04', 'https://example.com/deforestation.jpg'),
('Ecosystem', N'Hệ sinh thái', 'TP04', 'https://example.com/ecosystem.jpg'),
('Environment', N'Môi trường', 'TP04', 'https://example.com/environment.jpg'),
('Pollution', N'Ô nhiễm', 'TP04', 'https://example.com/pollution.jpg'),
('Recycling', N'Tái chế', 'TP04', 'https://example.com/recycling.jpg'),
('Sustainability', N'Bền vững', 'TP04', 'https://example.com/sustainability.jpg'),
('Waste', N'Rác thải', 'TP04', 'https://example.com/waste.jpg'),
('Wildlife', N'Động vật hoang dã', 'TP04', 'https://example.com/wildlife.jpg');

-- Insert users into the Users table
INSERT INTO Users (Username, PasswordHash, FullName, Email, Role)
VALUES
-- User 1
(N'user1', '1', N'Nguyen Van A', N'user1@gmail.com', 0),
-- User 2
(N'user2', '2', N'Tran Thi B', N'user2@gmail.com', 1),
-- User 3
(N'user3', '3', N'Le Van C', N'user3@gmail.com', 0),
-- User 4
(N'user4', '4', N'Pham Thi D', N'user4@gmail.com', 1),
-- User 5
(N'user5', '5', N'Nguyen Van E', N'user5@gmail.com', 0);

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
INSERT INTO Lessons (Title, Content, QuestionType, Guide, Score, PartID) VALUES 
-- Part 1: Photo
('Lesson 1: Predict what you will hear', 
 'In this part, you are asked to see a picture and choose the statement that most describes the picture. To be able to choose the correct answer, you should think of the topic of the picture and possible statements.', 
 'In this part, you are asked to see a picture.', 
 'Before the beginning of the section, think of the theme of the picture as well as brainstorm nouns and verbs related to the picture.', 
 '0 - 250', 1),
('Lesson 2: Listen for correct verb', 
 'In this part, you are asked to see a picture and choose the statement that most describes the picture. To earn a maximum score in this part, you need to choose the sentence with the verb that best describes what is seen in the picture.', 
 'In this part, you are asked to see a picture.', 
 'Listen carefully to check that the verb relates to the picture.', 
 '255 - 500', 1),
('Lesson 3: Listen for details', 
 'In this part, you are asked to look at a picture and choose the statement that most describes the picture. To attain a higher score in this part, you need to listen to every detail as most incorrect choices in this part will use some correct subject, verb, and object words and some wrong ones.', 
 'In this part, you are asked to look at a picture.', 
 'Listen for SVO words: Most TOEIC Part 1 questions follow a subject, verb or subject, verb, object pattern (SVO).', 
 '501 - 700', 1),
('Lesson 4: Listen for prepositions and similar sounds', 
 'In this section, your understanding of position and direction will be tested. To gain a higher score in this part, you need to be familiar with the words used to describe where things are and where they are going which will help you score well in this part of the test.', 
 'In this section, understanding of position and direction will be tested.', 
 'Listen for prepositions: Many statements in TOEIC Part 1 talk about the position of people or objects in the picture.', 
 '701 - 900', 1),
('Lesson 5: Practice with a mock test', 
 'This lesson provides a mock test to help you practice the skills learned in Part 1.', 
 'This lesson includes a mock test for practice.', 
 'Take the mock test and review your answers.', 
 '901 - 990', 1),

-- Part 2: Details
('Lesson 1: Answering direct questions', 
 'In this part of the test, you will often hear direct questions. The correct answer will not usually be an answer with ''Yes'', ''No'', or ''Don''t know'', and will often be in a different tense.', 
 'In this part of the test, you often hear direct questions.', 
 'Direct questions are rarely answered with ''Yes'', ''No'', or ''Don''t know''.', 
 '0 - 250', 2),
('Lesson 2: Time and location structures', 
 'In this part of the test, you are asked to choose the correct responses to questions about time and location, which are common in the TOEIC test. ''Where'' questions often contain the word ''where'', while ''When'' questions often involve phrases like ''How long'', ''When'', and ''What time''.', 
 'In this part of the test, you answer questions about time and location.', 
 'Answers to time and location questions often use common marker words.', 
 '255 - 500', 2),
('Lesson 3: Listen for details', 
 'In this part, you are asked to look at a picture and choose the statement that most describes the picture. To attain a higher score in this part, you need to listen to every detail as most incorrect choices in this part will use some correct subject, verb, and object words and some wrong ones.', 
 'In this part, you are asked to look at a picture.', 
 'Listen for SVO words: Most TOEIC Part 1 questions follow a subject, verb, or subject, verb, object pattern.', 
 '501 - 700', 2),
('Lesson 4: Dealing with factual questions', 
 'With this kind of question, you are asked to choose the correct responses to factual questions. Think carefully about what the question is actually asking for. Some answers may closely relate to the topic in the question, but not answer it directly.', 
 'In this part, you answer factual questions.', 
 'Answers in the TOEIC test do not always answer the question directly.', 
 '701 - 900', 2),
('Lesson 5: Practice with a mock test', 
 'This lesson provides a mock test to help you practice the skills learned in Part 2.', 
 'This lesson includes a mock test for practice.', 
 'Take the mock test and review your answers.', 
 '901 - 990', 2),

-- Part 3: Conversations
('Lesson 1: Skimming to predict context before listening', 
 'In this part of the test, you should skim the questions and answer choices to predict what you are going to hear.', 
 'In this part, you skim the questions and answer choices.', 
 'Use the time before listening to predict the context.', 
 '0 - 250', 3),
('Lesson 2: Word distractors', 
 'In this part of the test, the recording can often use words that are the same or have the same meaning as words in the answer choices. This may cause you to choose an incorrect answer. Be careful not to choose an answer simply because you heard something similar in the listening.', 
 'In this part, be careful with distracting words.', 
 'The TOEIC Part 3 sometimes uses the same words in the recording and answer choices, but with a different meaning.', 
 '255 - 500', 3),
('Lesson 3: Using vocabulary clues', 
 'The answers to many of the questions in this part of the test are not stated directly. You will have to listen carefully and use your knowledge of related vocabulary and context to choose many of the answers.', 
 'In this part, you use vocabulary clues.', 
 'Sometimes the answers are not stated directly in the passage.', 
 '501 - 700', 3),
('Lesson 4: Saying ''No'' and first exchange', 
 'In some recordings in the TOEIC Part 3, you will encounter negative responses. Being familiar with the language and organization common to negative responses can help you to choose the correct answer. It is also important to understand the first exchange, as this probably contains the answer to the first question.', 
 'In this part, you encounter negative responses.', 
 'Conversations involving saying ''no'' sometimes appear in the TOEIC test.', 
 '701 - 900', 3),
('Lesson 5: Practice with a mock test', 
 'This lesson provides a mock test to help you practice the skills learned in Part 3.', 
 'This lesson includes a mock test for practice.', 
 'Take the mock test and review your answers.', 
 '901 - 990', 3),

-- Part 4: Short Talks
('Lesson 1: Skimming to predict context before listening', 
 'Before listening, you should skim the questions and answer choices to predict what you are going to hear as well as to identify the key parts of the talk.', 
 'In this part, you skim questions and answer choices.', 
 'The TOEIC test often uses different words in the answer choices and the recording.', 
 '0 - 250', 4),
('Lesson 2: Word distractors', 
 'In this part of the test, the recording can often use words that are the same or have the same meaning as words in the answer choices. This may cause you to choose an incorrect answer. Be careful not to choose an answer simply because you heard something similar in the listening.', 
 'In this part, be careful with distracting words.', 
 'The TOEIC Part 4 sometimes uses the same words in the recording and answer choices, but with a different meaning.', 
 '255 - 500', 4),
('Lesson 3: Restatement/ Questions with numbers and quantities', 
 'In this part of the test, you are required to answer questions with numbers and quantities. In addition, you need to familiarize yourself with restatements.', 
 'In this part, you answer questions with numbers and quantities.', 
 'The correct answer choice often uses different words from what you will hear.', 
 '501 - 700', 4),
('Lesson 4: Saying ''No'' and first exchange', 
 'In some recordings in the TOEIC Part 4, you will encounter negative responses. Being familiar with the language and organization common to negative responses can help you to choose the correct answer. It is also important to understand the first exchange, as this probably contains the answer to the first question.', 
 'In this part, you encounter negative responses.', 
 'Conversations involving saying ''no'' sometimes appear in the TOEIC test.', 
 '701 - 900', 4),
('Lesson 5: Practice with a mock test', 
 'This lesson provides a mock test to help you practice the skills learned in Part 4.', 
 'This lesson includes a mock test for practice.', 
 'Take the mock test and review your answers.', 
 '901 - 990', 4),

-- Part 5: Incomplete Sentences
('Lesson 1: Part of speech', 
 'This part consists of multiple-choice questions. Some questions ask you to choose the correct option to fill in the blank by identifying the correct part of speech of the word needed.', 
 'This part consists of multiple-choice questions.', 
 'Decide what part of speech (adjectives, adverbs, noun, verb) is needed. There are some tips to identify the part of speech needed. For example, use suffixes (word endings) to help identify the part of speech.\nE.g: -ed/ -ing/ -ful/ -le (adj), -ly (adv), -ment (N).\nFind the answer choice of the correct type. Once you know what you are looking for, skim the answer choices to find it.', 
 '0 - 250', 5),
('Lesson 2: Gerunds & Infinitives', 
 'This part requires you to choose the correct answer to fill in the blank by determining whether the blank is in the “gerund” or “infinitive” forms.', 
 'This part requires you to choose the correct answer.', 
 'Look at the verb in the question to decide whether a gerund or an infinitive is needed in the answer.\nFind the answer choice of the correct type.\nWhen preparing for the exam, familiarize yourself with common phrases that include gerunds and infinitives.', 
 '255 - 500', 5),
('Lesson 3: Suffixes and Prefixes', 
 'In this part, you are asked to choose the word which contains the correct form of prefix or suffix to fill in the blank.', 
 'This part requires you to choose the correct prefix or suffix.', 
 'Learning common prefixes can help you guess the meaning of words you do not know. For example, the prefix “il” is often used before words beginning with “L” (E.g: illegal, illegible). The prefix “im” is often used before words beginning with “B, P, and M” (E.g: imbalanced, impossible, immeasurable).\nLearning common suffixes can help you to identify nouns and verbs.', 
 '501 - 700', 5),
('Lesson 4: Pronouns', 
 'This section requires you to select the correct type of pronoun from four options A, B, C, D to fill in the blank.', 
 'This section requires you to select the correct type of pronoun.', 
 'Identify which type of pronoun is needed in the blank.\nFor personal pronouns, if the blank replaces a subject, it is a subject pronoun (I, She, He, etc). If the blank replaces an object, it is an object pronoun (me, him, her).\nFor possessives, if the blank modifies a noun, it is a possessive adjective (my, your, our, etc). If the blank replaces a noun, it is a possessive pronoun (mine, yours, ours, etc).', 
 '701 - 900', 5),
('Lesson 5: Practice with a mock test', 
 'This lesson provides a mock test to help you practice the skills learned in Part 5.', 
 'This lesson includes a mock test for practice.', 
 'Take the mock test and review your answers.', 
 '901 - 990', 5),

-- Part 6: Text Completion
('Lesson 1: Using context to choose the correct verb form', 
 'In this section, you will be asked to choose the correct form of the verb by using the context of the sentence or the whole passage.', 
 'In this section, you will be asked to choose the correct verb form.', 
 'Look at the sentence (and the rest of the passage if necessary) to decide what tense is needed.\nChoose the correct option.', 
 '0 - 250', 6),
('Lesson 2: Choosing correct part of speech', 
 'This part asks you to choose the correct answer to fill in the blank by identifying which part of speech is required.', 
 'This part asks you to choose the correct answer.', 
 'Look at the question and decide what part of speech is needed. Use suffixes to determine what part of speech is needed.', 
 '255 - 500', 6),
('Lesson 3: Using clues to choose correct verb form', 
 'In this section, you are asked to select the correct verb form to fill in the blank by using the clues in the sentence and the passage.', 
 'In this section, you are asked to select the correct verb form.', 
 'Based on signals in the question as well as the rest of the text to choose the correct form.', 
 '501 - 700', 6),
('Lesson 4: Prepositions & Conjunctions', 
 'This part asks you to choose the correct answer to fill in the blank by identifying which preposition or conjunction is needed.', 
 'This part asks you to choose the correct answer.', 
 'With sentences asking to choose the correct prepositions, familiarize yourself with the ways prepositions are commonly used. This will help you eliminate wrong answers quickly.', 
 '701 - 900', 6),
('Lesson 5: Practice with a mock test', 
 'This lesson provides a mock test to help you practice the skills learned in Part 6.', 
 'This lesson includes a mock test for practice.', 
 'Take the mock test and review your answers.', 
 '901 - 990', 6),

-- Part 7: Single - Double - Triple Passages
('Lesson 1: Scanning', 
 'In this section, you are asked to read different passages and then answer specific information questions related to them by using the technique of scanning.', 
 'In this section, you are asked to read different passages.', 
 'Read questions and underline the keywords.\nScan the passage to look for the information needed.', 
 '0 - 250', 7),
('Lesson 2: Answering vocabulary questions and inferring the meaning', 
 'You have to read different passages and then answer vocabulary, main idea, and inference questions related to these passages.', 
 'You have to read different passages.', 
 'With vocabulary questions, read the sentences around the target word to try to guess the meaning.', 
 '255 - 500', 7),
('Lesson 3: Answering ''NOT'' questions, questions with names, numbers, dates and time', 
 '- With “NOT” questions, you are asked to select the answer which is not true or mentioned.\n- With questions with names, numbers, dates and times, you are required to choose the correct options.', 
 '- With “NOT” questions, select the answer which is not true.', 
 'Leave "NOT" questions to last: Answering the other questions may help you to answer "NOT" questions.', 
 '501 - 700', 7),
('Lesson 4: Dealing with charts, tables, forms and double, triple passages', 
 'In this section, you will be asked to answer questions related to charts, tables or forms. You also must deal with questions involving double and triple passages.', 
 'In this section, you will be asked to answer questions related to charts, tables or forms.', 
 'With questions involving charts, tables and forms, you need to understand parts of charts, tables and forms.', 
 '701 - 900', 7),
('Lesson 5: Practice with a mock test', 
 'This lesson provides a mock test to help you practice the skills learned in Part 7.', 
 'This lesson includes a mock test for practice.', 
 'Take the mock test and review your answers.', 
 '901 - 990', 7);

