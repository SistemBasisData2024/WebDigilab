import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Navigation from "./Navigation";
import CourseEdit from './CourseEdit';
import CourseAdd from "./CourseAdd";
import ChapterAdd from "./ChapterAdd";

function CoursesEdit() {
    const [cookies, setCookie] = useCookies('user');
    const [courses, setCourses] = useState(null);
    const [matkuls, setMatkuls] = useState(null);
    const [subject, setSubject] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
    const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);
    const navigate = useNavigate();

    const getAllCoursesURL = "http://localhost:4000/getAllCourses";
    const getAllCoursesByMatkulIdURL = `http://localhost:4000/getAllCourses/${subject}`;
    const getAllMatkulsURL = "http://localhost:4000/getAllMatkuls";

    useEffect(() => {
        if (!cookies.user) {
            navigate('/');
        } else {
            if (!cookies.user.isAslab) {
                navigate('/Home');
            }
            handleGetAllCourses();
        }
    }, [cookies, navigate]);

    useEffect(() => {
        if (subject === "") {
            handleGetAllCourses();
        } else {
            handleGetAllCoursesByMatkulId();
        }
    }, [subject]);

    const handleGetAllCourses = () => {
        fetch(getAllCoursesURL, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    alert('Server Not Responding');
                    return false;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log('Course Successfully Fetched:', data);
                    setCourses(data);
                }
            })
            .catch(() => {
                alert('Server Not Responding');
            });

        fetch(getAllMatkulsURL, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    alert('Server Not Responding');
                    return false;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log('Matkul Successfully Fetched:', data);
                    setMatkuls(data);
                }
            })
            .catch(() => {
                alert('Server Not Responding');
            });
    };

    const handleGetAllCoursesByMatkulId = () => {
        fetch(getAllCoursesByMatkulIdURL, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    alert('Server Not Responding');
                    return false;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log('Partial Course Successfully Fetched:', data);
                    setCourses(data);
                }
            })
            .catch(() => {
                alert('Server Not Responding');
            });
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleCardClick = (course) => {
        setSelectedCourse(course);
    };

    const closeModal = () => {
        setSelectedCourse(null);
    };

    const handleAddCourseClick = () => {
        setIsAddCourseModalOpen(true);
    };

    const handleAddChapterClick = () => {
        setIsAddChapterModalOpen(true);
    };

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    };

    const modalContentStyle = {
        backgroundColor: '#1F2937',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '600px',
    };

    if (!courses || !matkuls) return null;

    if (cookies.user) {
        return (
            <>
            <Navigation />
            
            <section className="bg-gray-900 text-white min-h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">Edit Courses</h2>
                        <p className="mt-4 text-gray-300">Manage your Courses on this page</p>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-4 mt-10">
                    <div className="flex space-x-4">
                        <button
                            className="w-30 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handleAddChapterClick}
                        >
                            Add Chapter
                        </button>

                        <button
                            className="w-30 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handleAddCourseClick}
                        >
                            Add Course
                        </button>
                    </div>

                        <div className="flex justify-end space-x-4 w-full">
                            <select
                                id="Subjects"
                                value={subject}
                                onChange={handleSubjectChange}
                                className="w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Choose a Subject</option>
                                {matkuls.map((matkul, index) => (
                                    <option key={index} value={matkul.matkul_id}>{matkul.matkul_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {courses.map((course, index) => (
                            <a 
                                key={index}
                                className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/100 hover:shadow-blue-500/50 flex hover:scale-105"
                                onClick={() => handleCardClick(course)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="flex-1 p-4">
                                    <h1 className="mt-4 text-xl font-bold">{course.course_name}</h1>
                                    <p className="mt-1 text-sm">{course.course_desc}</p>
                                </div>
                                <div 
                                    className="w-1/2 h-full bg-cover bg-center rounded-r-xl"
                                    style={{ backgroundImage: `url(${course.course_image ? course.course_image : '/embedded-system-micro.jpg'})` }}
                                ></div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {selectedCourse && (
                <div style={modalOverlayStyle} onClick={closeModal}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>Close</button>
                        <CourseEdit course={selectedCourse} matkuls={matkuls} onClose={closeModal} />
                    </div>
                </div>
            )}

            {isAddCourseModalOpen && (
                <div style={modalOverlayStyle} onClick={() => setIsAddCourseModalOpen(false)}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsAddCourseModalOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>Close</button>
                        <CourseAdd matkuls={matkuls} onClose={() => setIsAddCourseModalOpen(false)} />
                    </div>
                </div>
            )}

            {isAddChapterModalOpen && (
                <div style={modalOverlayStyle} onClick={() => setIsAddChapterModalOpen(false)}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsAddChapterModalOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>Close</button>
                        <ChapterAdd courses={courses} onClose={() => setIsAddChapterModalOpen(false)} />
                    </div>
                </div>
            )}
        </>
        );
    }
}

export default CoursesEdit;
