import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const lessons = {
    'Part 1: Photo': [
        {
            title: "Lesson 1: Predict what you will hear",
            content: {
                questionType: "In this part, you are asked to see a picture and choose the statement that most describes the picture. To be able to choose the correct answer, you should think of the topic of the picture and possible statements.",
                guide: [
                    "Before the beginning of the section, think of the theme of the picture as well as brainstorm nouns and verbs related to the picture.",
                    "Before listening, you also should predict possible statements. Most statements are about:",
                    "The activity",
                    "E.g. The man is writing an email.",
                    "The general situation",
                    "E.g. The meal is ready.",
                    "Spatial relationships",
                    "E.g. next to, near, across from, etc.",
                    "Focus while listening and choose the correct statement."
                ]
            }
        },
        {
            title: "Lesson 2: Listen for correct verb",
            content: {
                questionType: "In this part, you are asked to see a picture and choose the statement that most describes the picture. To earn a maximum score in this part, you need to choose the sentence with the verb that best describes what is seen in the picture.",
                guide: [
                    "Listen carefully to check that the verb relates to the picture: Echo the sentence silently as you listen and compare the verb used with what you see in the picture.",
                    "Select answers quickly: As you listen, hold your pencil over the answers. Try to echo the sentences. If you think a sentence is possibly correct, keep your pen on that answer choice. Don't move it until you hear a better choice. Answer quickly and move on to the next question."
                ]
            }
        },
        {
            title: "Lesson 3: Listen for details",
            content: {
                questionType: "In this part, you are asked to look at a picture and choose the statement that most describes the picture. To attain a higher score in this part, you need to listen to every detail as most incorrect choices in this part will use some correct subject, verb, and object words and some wrong ones.",
                guide: [
                    "Listen for SVO words: Most TOEIC Part 1 questions follow a subject, verb or subject, verb, object pattern (SVO). Listen carefully for SVO words and compare the words you hear to what is in the picture.",
                    "Listen for the wrong main subject, verb, and object: Some distractors use correct keywords and incorrect ones. If you hear an incorrect one, you can immediately ignore that answer choice."
                ]
            }
        },
        {
            title: "Lesson 4: Listen for prepositions and similar sounds",
            content: {
                questionType: "In this section, your understanding of position and direction will be tested. To gain a higher score in this part, you need to be familiar with the words used to describe where things are and where they are going which will help you score well in this part of the test.",
                guide: [
                    "Listen for prepositions: Many statements in TOEIC Part 1 talk about the position of people or objects in the picture. Listen carefully for wrong prepositions in these pictures.",
                    "Be careful of similar sounds: If you hear a word that sounds similar to a word you can see or imagine in the picture, it may be a distractor."
                ]
            }
        }
    ],
    'Part 2: Details': [
        {
            title: "Lesson 1: Answering direct questions",
            content: {
                questionType: "In this part of the test, you will often hear direct questions. The correct answer will not usually be an answer with 'Yes', 'No', or 'Don't know', and will often be in a different tense.",
                guide: [
                    "Direct questions are rarely answered with 'Yes', 'No', or 'Don't know'. Look for options that express the meaning without using these words.",
                    "Expect different verb tenses between the question and the answer choice: The grammar of the question may not match the answer. For example: 'Are you going tonight?' → 'I've made other plans.'",
                    "Be cautious of distractors that use the same or similar-sounding words: These are common in TOEIC Part 2, so pay attention when selecting your response.",
                    "Utilize short-term memory: Repeat each response in your head to verify if it answers the question or if it contains similar-sounding distractors."
                ]
            }
        },
        {
            title: "Lesson 2: Time and location structures",
            content: {
                questionType: "In this part of the test, you are asked to choose the correct responses to questions about time and location, which are common in the TOEIC test. 'Where' questions often contain the word 'where', while 'When' questions often involve phrases like 'How long', 'When', and 'What time'.",
                guide: [
                    "Answers to time and location questions often use common marker words: Familiarity with prepositions and other common words will help you choose the correct answer.",
                    "The correct answer may use very short or indefinite responses: Listen for these and determine what kind of question they could answer.",
                    "Learn to identify questions about location: These usually involve the word 'where', but other terms can also be used when asking for directions. 'Where' questions can sometimes have a 'Directions' answer; so, listen carefully.",
                    "Learn to identify 'When' questions: Typically, 'When' questions involve phrases like 'How long', 'When', and 'What time'."
                ]
            }
        },
        {
            title: "Lesson 3: Listen for details",
            content: {
                questionType: "In this part, you are asked to look at a picture and choose the statement that most describes the picture. To attain a higher score in this part, you need to listen to every detail as most incorrect choices in this part will use some correct subject, verb, and object words and some wrong ones.",
                guide: [
                    "Listen for SVO words: Most TOEIC Part 1 questions follow a subject, verb, or subject, verb, object pattern (SVO). Listen carefully for SVO words and compare the words you hear to what is in the picture.",
                    "Listen for the wrong main subject, verb, and object: Some distractors use correct keywords and incorrect ones. If you hear an incorrect one, you can immediately ignore that answer choice."
                ]
            }
        },
        {
            title: "Lesson 4: Dealing with factual questions",
            content: {
                questionType: "With this kind of question, you are asked to choose the correct responses to factual questions. Think carefully about what the question is actually asking for. Some answers may closely relate to the topic in the question, but not answer it directly.",
                guide: [
                    "Answers in the TOEIC test do not always answer the question directly. Therefore, you need to listen for answers with related details or explanations.",
                    "Don't expect the tense always to be the same: For example, the answer to a future or present question may explain something in the past.",
                    "Since the focus in TOEIC Part 2 is on meaning, you should listen for keywords (nouns, verbs, question words) to help you avoid distractors and find the correct answer choice.",
                    "Watch out for common distractors: Familiarity with the ways incorrect answer choices may distract you can help you make better choices."
                ]
            }
        }
    ],
    'Part 3: Conversations': [
        {
            title: "Lesson 1: Skimming to predict context before listening",
            content: {
                questionType: "In this part of the test, you should skim the questions and answer choices to predict what you are going to hear.",
                guide: [
                    "Use the time before listening to predict the context. This can make the listening easier. Use the key information in the answer choices to make a rough guess about what you are going to hear.",
                    "Listen carefully and choose the correct answer."
                ]
            }
        },
        {
            title: "Lesson 2: Word distractors",
            content: {
                questionType: "In this part of the test, the recording can often use words that are the same or have the same meaning as words in the answer choices. This may cause you to choose an incorrect answer. Be careful not to choose an answer simply because you heard something similar in the listening.",
                guide: [
                    "The TOEIC Part 3 sometimes uses the same words in the recording and answer choices, but with a different meaning. Therefore, be careful if you hear the same words in the conversation as in the answer choices.",
                    "Answers to Part 3 questions often use different words from the recording.",
                    "Listen to who says what: Often the answer choice will have keywords used by one of the speakers, but it may not be the speaker specified in the question. Noticing this can help you spot distractors."
                ]
            }
        },
        {
            title: "Lesson 3: Using vocabulary clues",
            content: {
                questionType: "The answers to many of the questions in this part of the test are not stated directly. You will have to listen carefully and use your knowledge of related vocabulary and context to choose many of the answers.",
                guide: [
                    "Sometimes the answers are not stated directly in the passage: Before listening, think of other words related to the answer choices and listen to infer the general meaning.",
                    "Some questions clearly ask you to infer things about the situation: Look for common inference markers: What can be said/implied/inferred...? and listen for related information in the recording."
                ]
            }
        },
        {
            title: "Lesson 4: Saying 'No' and first exchange",
            content: {
                questionType: "In some recordings in the TOEIC Part 3, you will encounter negative responses. Being familiar with the language and organization common to negative responses can help you to choose the correct answer. It is also important to understand the first exchange, as this probably contains the answer to the first question.",
                guide: [
                    "Conversations involving saying 'no' sometimes appear in the TOEIC test: Learn to identify denial and refusal phrases and listen carefully to the information that follows them. This information is often the focus of one of the questions.",
                    "Most Part 3 conversations start with a question or request: Listen carefully to what the first speaker says, and to the response, as they may relate to the first question."
                ]
            }
        }
    ],
    'Part 4: Short Talks': [
        {
            title: "Lesson 1: Skimming to predict context before listening",
            content: {
                questionType: "Before listening, you should skim the questions and answer choices to predict what you are going to hear as well as to identify the key parts of the talk.",
                guide: [
                    "The TOEIC test often uses different words in the answer choices and the recording: Before you listen, try to imagine other ways the answer choice might be said.",
                    "Note keywords: Picking out the keywords from the answer choices will help you to predict what you will hear, and focus you on what you have to listen for.",
                    "Answer the questions as soon as you hear the answer: Do not wait for the voice to tell you. Answer quickly, then use the 35-40 seconds between conversations to skim the next questions."
                ]
            }
        },
        {
            title: "Lesson 2: Word distractors",
            content: {
                questionType: "In this part of the test, the recording can often use words that are the same or have the same meaning as words in the answer choices. This may cause you to choose an incorrect answer. Be careful not to choose an answer simply because you heard something similar in the listening.",
                guide: [
                    "The TOEIC Part 4 sometimes uses the same words in the recording and answer choices, but with a different meaning. Therefore, be careful if you hear the same words in the talk as in the answer choices.",
                    "Answers to Part 4 questions often use different words from the recording.",
                    "Listen to who says what: Often the answer choice will have keywords used by the speaker, but it may not be the speaker specified in the question. Noticing this can help you spot distractors."
                ]
            }
        },
        {
            title: "Lesson 3: Restatement/ Questions with numbers and quantities",
            content: {
                questionType: "In this part of the test, you are required to answer questions with numbers and quantities. In addition, you need to familiarize yourself with restatements.",
                guide: [
                    "The correct answer choice often uses different words from what you will hear: Be aware of this and listen for meaning, not just the key words.",
                    "Specific information questions sometimes appear in the same order they appear in the listening: Focus on the questions in order. When you hear the answer, mark it and move on immediately.",
                    "Be careful of questions involving numbers and quantities: Read the question and carefully note what it is asking, then quickly read the answer choices. When you hear one of the numbers in the recording, decide whether it answers the question or not.",
                    "Be cautious of sound distractors in numbers ending in -teen or -ty, e.g., 13 sounds like 30."
                ]
            }
        },
        {
            title: "Lesson 4: Saying 'No' and first exchange",
            content: {
                questionType: "In some recordings in the TOEIC Part 4, you will encounter negative responses. Being familiar with the language and organization common to negative responses can help you to choose the correct answer. It is also important to understand the first exchange, as this probably contains the answer to the first question.",
                guide: [
                    "Conversations involving saying 'no' sometimes appear in the TOEIC test: Learn to identify denial and refusal phrases and listen carefully to the information that follows them. This information is often the focus of one of the questions.",
                    "Most Part 4 conversations start with a question or request: Listen carefully to what the speaker says and to the response, as they may relate to the first question."
                ]
            }
        }
    ]
};

function Listening() {
    const [openPart, setOpenPart] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [lessonContent, setLessonContent] = useState({});
    const [currentPart, setCurrentPart] = useState(''); // Thêm state để lưu phần hiện tại

    const togglePart = (part) => {
        setOpenPart(openPart === part ? null : part);
        const partNumber = Object.keys(lessons).indexOf(part) + 1;
        setCurrentPart(`part${partNumber}`); // Cập nhật phần hiện tại theo định dạng part1, part2, ...
    };

    const handleLessonClick = (lessonName, content) => {
        setSelectedLesson(lessonName);
        setLessonContent(content);
        document.getElementById('lesson-content').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex">
            <div className="w-1/4 p-4 ml-12">
                <h2 className="text-2xl font-bold">Sidebar</h2>
                <ul className="mt-4">
                    {Object.keys(lessons).map((part, index) => (
                        <li key={index}>
                            <button
                                onClick={() => togglePart(part)}
                                className="block w-full text-left p-2 hover:bg-gray-300 rounded-lg transition duration-200 text-2xl font-bold">
                                {part}
                            </button>
                            {openPart === part && (
                                <ul className="ml-4 mt-2">
                                    {lessons[part].map((lesson, lessonIndex) => (
                                        <li key={lessonIndex}>
                                            <button
                                                onClick={() => handleLessonClick(lesson.title, lesson.content)}
                                                className={`block p-2 hover:bg-gray-300 rounded-lg transition duration-200 text-xl text-left ${selectedLesson === lesson.title ? 'bg-gray-400' : ''}`}>
                                                {lesson.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-3/4 p-4 ml-4" id="lesson-content">
                {selectedLesson && (
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-center">{selectedLesson}</h3>
                        <h4 className="text-2xl font-semibold mt-4"><strong>1. Question type</strong></h4>
                        <p className="text-xl">{lessonContent.questionType}</p>
                        <h4 className="text-2xl font-semibold mt-4"><strong>2. Guide to answer</strong></h4>
                        <ul className="list-none ml-5">
                            {lessonContent.guide && lessonContent.guide.map((item, index) => (
                                <li key={index} className="text-xl mb-2">
                                    - {item}
                                </li>
                            ))}
                        </ul>
                        <div className="text-right mt-4">
                            <Link
                                to={`/listening/${currentPart}`} // Đường dẫn bây giờ chỉ là part1, part2
                                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                                Làm bài tập
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Listening;