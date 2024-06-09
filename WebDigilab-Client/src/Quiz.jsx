import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Navigation from "./Navigation";
import axios from 'axios';
import Modal from 'react-modal';

// Bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

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
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const scoreStoredRef = useRef(false); // Using useRef to track if the score has been stored

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
        }
    };

    const handleQuizSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion || !currentQuestion.question_answer) {
            alert('Error: No correct answer provided.');
            return;
        }

        const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.question_answer.trim().toLowerCase();
        setResults(prevResults => [...prevResults, isCorrect]);
        setScore(prevScore => {
            const newScore = prevScore + (isCorrect ? 1 : 0);
            setSubmitted(true);
            if (!scoreStoredRef.current) {
                scoreStoredRef.current = true;
                storeQuizScore((newScore) / questions.length * 100);
            }
            return newScore;
        });
    };

    const storeQuizScore = async (scoreResult) => {
        try {
            const studentId = cookies.user.data.praktikan_id;
            console.log("storeQuizScore called with scoreResult:", scoreResult);
            await axios.post(
                'http://localhost:4000/storeScore',
                {
                    quizId,
                    studentId,
                    scoreResult
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            alert('Score stored successfully');
        } catch (error) {
            console.error('Error storing score:', error);
            alert('Error storing score');
        }
    };

    const toggleImageModal = () => {
        setIsImageModalOpen(!isImageModalOpen);
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const averageScore = (score / questions.length) * 100;

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto'
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
    };

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
                                    {currentQuestion.question_image && (
                                        <>
                                            <img
                                                src={currentQuestion.question_image}
                                                alt="Question"
                                                className="mt-4 rounded-lg max-w-xs h-auto"
                                                onClick={toggleImageModal}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <Modal
                                                isOpen={isImageModalOpen}
                                                onRequestClose={toggleImageModal}
                                                contentLabel="Image Modal"
                                                style={modalStyles}
                                            >
                                                <button
                                                    onClick={toggleImageModal}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        fontSize: '1.5rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                                <img
                                                    src={currentQuestion.question_image}
                                                    alt="Question"
                                                    className="max-w-full h-auto"
                                                />
                                            </Modal>
                                        </>
                                    )}
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
                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <button
                                            onClick={handleAnswerSubmit}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleQuizSubmit}
                                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                                        >
                                            Submit
                                        </button>
                                    )}
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
