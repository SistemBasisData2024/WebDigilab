

import { useState } from 'react';

function CourseAdd(props) {
    const addCourseURL = "http://localhost:4000/createCourse";

    const [subject, setSubject] = useState(props.matkuls[0].matkul_id);

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleAddCourse = (event) => {
        event.preventDefault();
        const form = event.target;
        if (!form.checkValidity()) {
            alert("Please fill in the required fields!");
            return;
        }

        const formData = new FormData(form);
        const params = new URLSearchParams();

        params.append('matkul_id', subject);
        params.append('course_name', formData.get('course_name'));
        params.append('course_desc', formData.get('course_desc'));
        params.append('course_image', formData.get('course_image_link'));

        fetch(addCourseURL, {
            method: 'POST',
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
                    console.log('Update Course successfully:', data);
                    window.location.reload();
                }
            }).catch(() => {
                alert('Server Not Responding');
            });
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center text-2xl font-bold mb-4 text-white">Create Course</h2>
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
            <form onSubmit={handleAddCourse}>
                <div className="relative z-0 w-full mb-5 group ">
                    <input
                        type="text"
                        name="course_name"
                        id="course_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
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
                        
                    />
                    <label
                        htmlFor="course_image_link"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Course Image Link
                    </label>
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="mb-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CourseAdd;
