import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import PartCard from "../../components/Card/PartCard";
import Question from "../../components/Question";
import axios from "axios";

function ReadingPage() {
  const userId = 1; // Cố định userId là 1
  const { data: stats, loading, error } = useFetch(
    `http://localhost:3000/api/user-question-stats/${userId}`
  );

  // State quản lý Part và câu hỏi
  const [selectedPart, setSelectedPart] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [content, setContent] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // Hàm fetch câu hỏi dựa trên Part
  const fetchQuestions = async (partNumber) => {
    if (partNumber === 6) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/random-group/${partNumber}`
        );
        if (response.data.length > 0) {
          setContent(response.data[0].Content);
          setQuestions(response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    } else if (partNumber === 5) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/question/part/${partNumber}/random`
        );
        setQuestions([response.data]); // Lưu câu hỏi đơn lẻ
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    }
  };

  // Khi chọn một phần, load câu hỏi tương ứng
  useEffect(() => {
    if (selectedPart) {
      fetchQuestions(selectedPart);
    }
  }, [selectedPart]);

  // Chuyển sang câu tiếp theo
  const handleNext = () => {
    setIsSelected(false);
    window.scrollTo({ top: 0, behavior: "auto" });
    fetchQuestions(selectedPart);
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex">
        {/* Sidebar với danh sách các phần */}
        <div className="h-[100vh]">
          <p className="text-2xl bg-blue-800 w-96 text-white px-2 uppercase">
            Reading
          </p>
          {stats.map((stat) => (
            <div
              key={stat.PartID}
              className="cursor-pointer"
              onClick={() => setSelectedPart(stat.PartID)} // Chọn Part
            >
              <PartCard
                id={stat.PartID}
                title={stat.Title}
                number={stat.TotalQuestions}
                learned={stat.CompletedQuestions}
                incorrect={stat.IncorrectQuestions}
              />
            </div>
          ))}
        </div>

        {/* Nội dung câu hỏi */}
        <div className="Question flex-1">
          {selectedPart ? (
            <div className="w-auto md:w-[64rem] m-auto mt-10">
              {/* Câu hỏi */}
              <div className="w-[48rem]">
                {selectedPart === 6 && content && (
                  <div className="mb-5">
                    <h2 className="text-lg font-semibold">{content}</h2>
                  </div>
                )}

                {selectedPart === 6 && (
                  <div className="h-96 overflow-scroll py-5">
                    {questions.map((question, index) => (
                      <Question
                        onAnswerUpdate={() => setIsSelected(true)}
                        data={question}
                        key={index}
                      />
                    ))}
                  </div>
                )}

                {selectedPart === 5 && questions.length > 0 && (
                  <Question
                    onAnswerUpdate={() => setIsSelected(true)}
                    data={questions[0][0]}
                  />
                )}

                {/* Nút chuyển câu */}
                <div className="w-full flex justify-between">
                  <button
                    className={`bg-green-400 p-2 rounded-xl text-white ${
                      isSelected ? "block" : "hidden"
                    }`}
                    onClick={handleNext}
                  >
                    Câu tiếp theo
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center mt-10 text-gray-500">
              Chọn một phần để bắt đầu làm bài.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReadingPage;
