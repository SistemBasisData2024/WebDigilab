import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Navigation from "./Navigation";
import axios from 'axios';

function Quiz() {
    const { quizId } = useParams();
    const [cookies] = useCookies(['user']);
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [results, setResults] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                if (!cookies.user) {
                    navigate('/');
                } else {
                    const response = await axios.get(`http://localhost:4000/getQuestions/${quizId}`);
                    setQuestions(response.data);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [quizId, cookies, navigate]);

    const handleAnswerSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion || !currentQuestion.question_answer) {
            alert('Error: No correct answer provided.');
            return;
        }

        const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.question_answer.trim().toLowerCase();
        setResults(prevResults => [...prevResults, isCorrect]);
        setScore(prevScore => prevScore + (isCorrect ? 1 : 0));

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setUserAnswer('');
        } else {
            setSubmitted(true);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const averageScore = (score / questions.length) * 100;

    return (
        <>
            <Navigation />

            <section className="bg-gray-900 text-white min-h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">Quiz</h2>
                        <p className="mt-4 text-gray-300">
                            Answer all the questions and submit to see your results.
                        </p>
                    </div>

                    <div className="mt-8">
                        {!submitted ? (
                            <div className="bg-gray-800 rounded-xl p-8 shadow-xl mb-4">
                                <div className="question">
                                    <h2 className="text-2xl font-bold">{currentQuestion.question_text}</h2>
                                </div>
                                <div className="answer mt-4">
                                    <input
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-lg"
                                    />
                                </div>
                                <div className="actions mt-4">
                                    <button onClick={handleAnswerSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-3xl font-bold sm:text-4xl">Quiz Completed</h2>
                                <p className="mt-4 text-gray-300">
                                    Your score: {score} out of {questions.length} ({averageScore.toFixed(2)}%)
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Quiz;
