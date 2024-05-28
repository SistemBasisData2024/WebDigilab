import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function CourseEdit(props) {
    const editCourseURL = "http://localhost:4000/editCourse";
    const editChapterURL = "http://localhost:4000/editChapter";
    const deleteCourseURL = "http://localhost:4000/deleteCourse";
    const deleteChapterURL = "http://localhost:4000/deleteChapter";
    const getAllChaptersByCourseIdURL = `http://localhost:4000/getAllChapters/${props.course.course_id}`;
    const navigate = useNavigate();

    const [subject, setSubject] = useState(props.course.matkul_id);
    const [chapters, setChapters] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    useEffect(() => {
        handleGetAllChapters();
      }, []);

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleChapterChange = (event) => {
        const chapterId = event.target.value;
        const chapter = chapters.find(ch => ch.chapter_id === chapterId);
        setSelectedChapter(chapter);
       
    };

    const handleEditCourse = (event) => {
        event.preventDefault();
        const form = event.target;
        if (!form.checkValidity()) {
            alert("Please fill in the required fields!");
            return;
        }

        const formData = new FormData(form);
        const params = new URLSearchParams();

        params.append('course_id', props.course.course_id);
        params.append('matkul_id', subject);
        params.append('course_name', formData.get('course_name'));
        params.append('course_desc', formData.get('course_desc'));
        params.append('course_image', formData.get('course_image_link'));

        fetch(editCourseURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        })
            .then(response => {
                if (!response.ok) {
                    alert('Server1 Not Responding');
                    return false;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log('Update Course successfully:', data);
                }
            })

        if (selectedChapter) {
            const formData2 = new FormData(form);
            const params2 = new URLSearchParams();

            params2.append('chapter_id', selectedChapter.chapter_id);
            params2.append('chapter_title', formData2.get('chapter_title'));
            params2.append('chapter_no', formData2.get('chapter_no'));
            params2.append('chapter_link', formData2.get('chapter_link'));

            fetch(editChapterURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params2.toString()
            })
                .then(response => {
                    if (!response.ok) {
                        alert('Server3 Not Responding');
                        return false;
                    }
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        console.log('Update Chapter successfully:', data);
                        
                    }
                })
                
        }

        window.location.reload();
    };

    const handleDeleteCourse = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) {
            return;
        }

        const params = new URLSearchParams();
        params.append('course_id', props.course.course_id);

        fetch(deleteCourseURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        })
            .then(response => {
                if (!response.ok) {
                    alert('Server Not Responding');
                    return false;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log('Course deleted successfully:', data);
                    window.location.reload();
                }
            }).catch(() => {
                alert('Server Not Responding');
            });
    };

    const handleDeleteChapter = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
        if (!confirmDelete) {
            return;
        }

        const params = new URLSearchParams();
        params.append('chapter_id', selectedChapter.chapter_id);

        fetch(deleteChapterURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        })
            .then(response => {
                if (!response.ok) {
                    alert('Server Not Responding');
                    return false;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log('Chapter deleted successfully:', data);
                    window.location.reload();
                }
            }).catch((err) => {
                console.log(err);
            });
    };


    const handleGetAllChapters = () => {
        fetch(getAllChaptersByCourseIdURL, {
          method: 'GET',
        })
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
              setChapters(data);
            }
          }).catch(() => {
            alert('Server Not Responding');
          });
      };
    
    if (!chapters) return null;

    return (
        <div className="max-w-md mx-auto max-h-96 overflow-y-auto pr-4"  style={{ maxHeight: '400px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#4F46E5 #1F2937' }}>
            <h2 className="text-center text-2xl font-bold mb-4 text-white">Edit</h2>
            <hr className='mb-4 border-t border-gray-400 '/>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Subjects</p>
            <select
                id="Subjects"
                value={subject}
                onChange={handleSubjectChange}
                className=" w-60 mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {props.matkuls.map((matkul, index) => (
                    <option key={index} value={matkul.matkul_id}>{matkul.matkul_name}</option>
                ))}
            </select>
            <hr className='mb-8 border-t border-gray-400 '/>
            <form onSubmit={handleEditCourse}>
                <div className="relative z-0 w-full mb-5 group ">
                    <input
                        type="text"
                        name="course_name"
                        id="course_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        defaultValue={props.course.course_name || ''} // Set defaultValue based on props
                        required
                    />
                    <label
                        htmlFor="course_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Course Name
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="course_desc"
                        id="course_desc"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        defaultValue={props.course.course_desc || ''} // Set defaultValue based on props
                        
                    />
                    <label
                        htmlFor="course_desc"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Course Description
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="course_image_link"
                        id="course_image_link"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        defaultValue={props.course.course_image || ''} // Set defaultValue based on props
                        
                    />
                    <label
                        htmlFor="course_image_link"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Course Image Link
                    </label>
                </div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>Chapters</p>
                <select
                    id="Chapters"
                    value={selectedChapter ? selectedChapter.chapter_id : ""}
                    onChange={handleChapterChange}
                    className=" w-60 mt-4 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >   
                    <option value="">Choose a chapter</option>
                    {chapters.map((chapter, index) => (
                        <option key={index} value={chapter.chapter_id}>{chapter.chapter_title || ''}</option>
                    ))}
                </select>
                {selectedChapter && (
                    <div key={selectedChapter.id}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="chapter_title"
                                id="chapter_title"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedChapter.chapter_title}
                                onChange={(e) => setSelectedChapter({ ...selectedChapter, chapter_title: e.target.value })}
                                required
                            />
                            <label
                                htmlFor="chapter_title"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Chapter Title
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                name="chapter_no"
                                id="chapter_no"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedChapter.chapter_no}
                                onChange={(e) => setSelectedChapter({ ...selectedChapter, chapter_no: e.target.value })}
                                required
                            />
                            <label
                                htmlFor="chapter_no"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Chapter Number
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="chapter_link"
                                id="chapter_link"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedChapter.chapter_link}
                                onChange={(e) => setSelectedChapter({ ...selectedChapter, chapter_link: e.target.value })}
                                required
                            />
                            <label
                                htmlFor="chapter_link"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Chapter Link
                            </label>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleDeleteChapter}
                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-40 mb-5 px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                                Delete Chapter
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex space-x-4 mb-5">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteCourse}
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CourseEdit;
