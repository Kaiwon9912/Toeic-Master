import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      background: 'linear-gradient(to right, #6EE7B7, #3B82F6)',  // Gradient background
      borderRadius: '20px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      height: '100vh',
      overflow: 'hidden',
    },
    sidebar: {
      width: '280px',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      overflowY: 'auto',
      height: '100%',
      marginRight: '20px',
    },
    content: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 40px)',  // Fix overflow and ensure it fits in viewport
      marginTop: '20px',
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1e40af',
      marginBottom: '20px',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    partButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#f3f4f6',
      textAlign: 'left',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '8px',
      marginBottom: '10px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    partButtonHovered: {
      backgroundColor: '#E0F7FA',
      transform: 'scale(1.05)',
    },
    lessonCard: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
      marginBottom: '15px',
      padding: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    lessonCardSelected: {
      backgroundColor: '#f1f5f9',
    },
    iframe: {
      width: '100%',
      height: '500px',
      border: 'none',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    guideList: {
      listStyleType: 'none',
      paddingLeft: '20px',
      fontSize: '16px',
    },
    guideItem: {
      marginBottom: '10px',
    },
    linkButton: {
      backgroundColor: '#1e40af',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '25px',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    linkButtonHover: {
      backgroundColor: '#3B82F6',
      transform: 'scale(1.05)',
    },
    sectionCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#1e40af',
    },
    sectionText: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#333',
    },
    accordionContainer: {
      paddingLeft: '20px',
      marginTop: '10px',
    },
    accordionItem: {
      marginBottom: '8px',
      padding: '5px 0',
      cursor: 'pointer',
    },
    accordionText: {
      fontSize: '16px',
      color: '#555',
    },
    buttonContainer: {
      textAlign: 'right',
      marginTop: '20px',
    },
    lessonContentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    videoWrapper: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center',
    },
  };

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
    const partNumber = Object.keys(lessons).indexOf(partID) + 1;
    setCurrentPart(`part${partNumber}`);
  };

  const handleLessonClick = (lessonName, content, mediaURL) => {
    setSelectedLesson(lessonName);
    setLessonContent(content);
    setCurrentMediaURL(mediaURL);
    document.getElementById('lesson-content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={styles.title}>Lessons</h3>
        {parts.slice(4, 7).map((part) => (
          <div key={part.PartID}>
            <button
              onClick={() => togglePart(part.PartID)}
              style={openPart === part.PartID ? { ...styles.partButton, ...styles.partButtonHovered } : styles.partButton}
            >
              {part.Title}
            </button>
            {openPart === part.PartID && (
              <div>
                {lessons[part.PartID]?.map((lesson, index) => (
                  <div
                    key={index}
                    onClick={() => handleLessonClick(lesson.title, lesson.content, part.MediaURL)}
                    style={selectedLesson === lesson.title ? { ...styles.lessonCard, ...styles.lessonCardSelected } : styles.lessonCard}
                  >
                    <h4>{lesson.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.content} id="lesson-content">
        {selectedLesson && (
          <div style={styles.lessonContentContainer}>
            <h3 style={styles.title}>{selectedLesson}</h3>

            {/* Video Content */}
            {currentMediaURL && (
              <div style={styles.videoWrapper}>
                <iframe
                  style={styles.iframe}
                  src={currentMediaURL.replace("youtu.be/", "youtube.com/embed/")}
                  title="YouTube video player"
                  allowFullScreen
                />
              </div>
            )}

            {/* Question Type Section */}
            <div style={styles.sectionCard}>
              <h4 style={styles.sectionTitle}>1. Question type</h4>
              <p style={styles.sectionText}>{lessonContent.questionType}</p>
            </div>

            {/* Guide Section */}
            <div style={styles.sectionCard}>
              <h4 style={styles.sectionTitle}>2. Guide to answer</h4>
              <div style={styles.accordionContainer}>
                {lessonContent.guide && lessonContent.guide.map((item, index) => (
                  <div key={index} style={styles.accordionItem}>
                    <p style={styles.accordionText}>- {item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Button */}
            <div style={styles.buttonContainer}>
              <Link to={`/listening/${currentPart}`} style={styles.linkButton}>
                Take an example
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reading;
