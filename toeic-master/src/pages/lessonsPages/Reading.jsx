import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Reading() {
  const [openPart, setOpenPart] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState('');
  const [lessonContent, setLessonContent] = useState({});
  const [currentPart, setCurrentPart] = useState('');
  const [lessons, setLessons] = useState({});
  const [parts, setParts] = useState([]);
  const [currentMediaURL, setCurrentMediaURL] = useState('');

  // Fetch lessons data from the API
  const fetchLessons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/lessons');
      if (!Array.isArray(response.data) || response.data.length === 0) {
        throw new Error('No lessons found or invalid data format');
      }

      const formattedLessons = response.data.reduce((acc, lesson) => {
        const partKey = lesson.PartID;
        if (!acc[partKey]) {
          acc[partKey] = [];
        }
        acc[partKey].push({
          title: lesson.Title,
          content: {
            questionType: lesson.QuestionType,
            guide: lesson.Guide.split('\n')
          }
        });
        return acc;
      }, {});

      const limitedLessons = Object.keys(formattedLessons).slice(4, 7).reduce((acc, key) => {
        acc[key] = formattedLessons[key];
        return acc;
      }, {});

      setLessons(limitedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error.message);
    }
  };

  // Fetch parts data from the API
  const fetchParts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/parts');
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error.message);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchParts();
  }, []);

  const togglePart = (partID) => {
    setOpenPart(openPart === partID ? null : partID);
    setCurrentPart(`part${partID}`); // Cập nhật currentPart chỉ khi partNumber hợp lệ
  };

  const handleLessonClick = (lessonName, content, mediaURL) => {
    setSelectedLesson(lessonName);
    setLessonContent(content);
    setCurrentMediaURL(mediaURL);
    document.getElementById('lesson-content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-300 to-blue-500 p-5">
      <div className="flex flex-grow overflow-hidden">
        <div className="w-72 bg-white p-5 rounded-lg shadow-md overflow-y-auto mr-5">
          <h3 className="text-2xl font-bold text-blue-800 mb-5 text-center uppercase">Lessons</h3>
          {parts.slice(4, 7).map((part) => (
            <div key={part.PartID}>
              <button
                onClick={() => togglePart(part.PartID)}
                className={`w-full py-3 bg-gray-100 text-left text-lg font-bold rounded-lg mb-2 transition-all duration-300 ${openPart === part.PartID ? 'bg-teal-200 scale-105' : ''}`}
              >
                {part.Title}
              </button>
              {openPart === part.PartID && (
                <div>
                  {lessons[part.PartID]?.map((lesson, index) => (
                    <div
                      key={index}
                      onClick={() => handleLessonClick(lesson.title, lesson.content, part.MediaURL)}
                      className={`bg-white rounded-lg shadow-md p-5 mb-3 cursor-pointer transition-all duration-300 ${selectedLesson === lesson.title ? 'bg-gray-200' : ''}`}
                    >
                      <h4 className="text-lg">{lesson.title}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex-grow bg-white p-5 rounded-lg shadow-md overflow-y-auto w-7" id="lesson-content">
          {selectedLesson && (
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-bold text-blue-800 mb-5">{selectedLesson}</h3>

              {/* Video Content */}
              {currentMediaURL && (
                <div className="flex justify-center mb-5">
                  <iframe
                    className="w-full h-96 rounded-lg shadow-md"
                    src={currentMediaURL.replace("youtu.be/", "youtube.com/embed/")}
                    title="YouTube video player"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Question Type Section */}
              <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                <h4 className="text-xl font-semibold text-blue-800 mb-2">1. Question type</h4>
                <p className="text-gray-700">{lessonContent.questionType}</p>
              </div>

              {/* Guide Section */}
              <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                <h4 className="text-xl font-semibold text-blue-800 mb-2">2. Guide to answer</h4>
                <div className="pl-5">
                  {lessonContent.guide && lessonContent.guide.map((item, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-gray-600">- {item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="text-right mt-5">
                <Link to={`/listening/${currentPart}`} className="bg-blue-800 text-white py-2 px-5 rounded-full transition-all duration-300 hover:bg-blue-700">
                  Take an example
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Reading;