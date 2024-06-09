import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Navigation from "./Navigation";
import axios from 'axios';

function Quizzes() {
    const [cookies] = useCookies(['user']);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [error, setError] = useState('');

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getAllCourses');
            setCourses(response.data);
        } catch (err) {
            setError('Error fetching courses');
        }
    };

    const fetchChapters = async (courseId) => {
        try {
            const response = await axios.get(`http://localhost:4000/getAllChapters/${courseId}`);
            setChapters(response.data);
        } catch (err) {
            setError('Error fetching chapters');
        }
    };

    const fetchQuizzes = async (chapterId) => {
        try {
            const response = await axios.get(`http://localhost:4000/getQuizzes/${chapterId}`);
            setQuizzes(response.data);
            console.log(response);
        } catch (err) {
            setError('Error fetching quizzes');
        }
    };

    useEffect(() => {
        if (!cookies.user) {
            navigate('/');
        } else {
            fetchCourses();
        }
    }, [cookies, navigate]);

    useEffect(() => {
        if (selectedCourse) {
            fetchChapters(selectedCourse);
        }
    }, [selectedCourse]);

    useEffect(() => {
        handleFetchQuizzes()
    }, [selectedChapter])

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
        setSelectedChapter('');
        setQuizzes([]);
    };

    const handleChapterChange = (e) => {
        setSelectedChapter(e.target.value); 
    };

    const handleFetchQuizzes = () => {
        if (selectedChapter) {
            fetchQuizzes(selectedChapter);
        }
    };

    return (
        <>
            <Navigation />
            <section className="bg-gray-900 text-white min-h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">Quizzes</h2>
                        <p className="mt-4 text-gray-300">
                            Select a course and chapter to view available quizzes.
                        </p>
                    </div>
                    <div className="mt-8">
                        {error && <div className="text-red-500">{error}</div>}
                        <div className="mb-4">
                            <label className="block mb-2">Select Course</label>
                            <select
                                value={selectedCourse}
                                onChange={handleCourseChange}
                                className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                            >
                                <option value="">Choose a Course</option>
                                {courses.map(course => (
                                    <option key={course.course_id} value={course.course_id}>
                                        {course.course_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Select Chapter</label>
                            <select
                                value={selectedChapter}
                                onChange={handleChapterChange}
                                className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                                disabled={!selectedCourse}
                            >
                                <option value="">Choose a Chapter</option>
                                {chapters.map(chapter => (
                                    <option key={chapter.chapter_id} value={chapter.chapter_id}>
                                        {chapter.chapter_title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
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
                                        style={{ backgroundImage: `url(${quiz.quiz_image && quiz.quiz_image !== 'null' && quiz.quiz_image !== ''  ? quiz.quiz_image : '/embedded-system-micro.jpg'})` }}
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
