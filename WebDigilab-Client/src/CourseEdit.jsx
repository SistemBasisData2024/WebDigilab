import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function CourseEdit(props) {
    const editCourseURL = "http://localhost:4000/editCourse";
    const navigate = useNavigate();

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
        params.append('matkul_id', props.course.matkul_id);
        params.append('course_name', formData.get('course_name'));
        params.append('course_desc', formData.get('course_desc'));
        params.append('course_image', formData.get('course_image_link'));

        fetch(editCourseURL, {
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
            <h2 className="text-center text-2xl font-bold mb-4 text-white">Edit</h2>
            <hr className='mb-10 border-t border-gray-400 '/>
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
                <button
                    type="submit"
                    className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CourseEdit;
