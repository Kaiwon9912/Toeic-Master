import Question from "../components/Question";
function QuestionPage ()
{
    return (
        <div className="w-1/2 p-5 m-auto ">
            <h1>TOEIC Practice</h1>
            <Question part={5} /> {/* Thay đổi part theo nhu cầu */}
        </div>
    );
} export default QuestionPage;