import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";
import axios from 'axios';

function Quizzes() {
    const { chapterId } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/getQuizzes/${chapterId}`);
                setQuizzes(response.data);
            } catch (err) {
                setError('Error fetching quizzes');
            }
        };

        fetchQuizzes();
    }, [chapterId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Navigation />
            <section className="bg-gray-900 text-white min-h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">Quizzes</h2>
                        <p className="mt-4 text-gray-300">
                            Here are the quizzes available for the selected chapter.
                        </p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {error && <div className="text-red-500">{error}</div>}
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz, index) => (
                                <a 
                                    key={index}
                                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/100 hover:shadow-blue-500/50 flex hover:scale-105"
                                    href={`/quiz/${quiz.quiz_id}`}
                                >
                                    <div className="flex-1 p-4">
                                        <h1 className="mt-4 text-xl font-bold">{quiz.quiz_title}</h1>
                                        <p className="mt-1 text-sm">{quiz.quiz_desc}</p>
                                    </div>
                                    <div 
                                        className="w-1/2 h-full bg-cover bg-center rounded-r-xl"
                                        style={{ backgroundImage: `url(${quiz.quiz_image ? quiz.quiz_image : '/default-quiz-image.jpg'})` }}
                                    ></div>
                                </a>
                            ))
                        ) : (
                            <p className="text-gray-300">No quizzes available for this chapter.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Quizzes;
