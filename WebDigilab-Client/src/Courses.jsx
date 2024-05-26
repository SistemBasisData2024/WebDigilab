import {useNavigate} from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie'
import {useState, useEffect} from 'react'
import Navigation from "./Navigation";

function Courses() {

    const [cookies, setCookie] = useCookies('user');
    const [courses, setCourses] = useState(null);
    const [matkuls, setMatkuls] = useState(null);
    const [subject, setSubject] = useState("");
    const navigate = useNavigate();

    const getAllCoursesURL = "http://localhost:4000/getAllCourses"
    const getAllCoursesByMatkulIdURL = `http://localhost:4000/getAllCourses/${subject}`
    const getAllMatkulsURL = "http://localhost:4000/getAllMatkuls"

    useEffect(() => {
        // Check if the 'user' cookie exists
        if (!cookies.user) {
            navigate('/');
        } 
        else {
            handleGetAllCourses();
        }
    }, [cookies, navigate]);

    const handleGetAllCourses = () => {
        
        
        fetch(getAllCoursesURL, {
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
                console.log('Course Succesfully Fetch:', data);
                setCourses(data);
            }
          }).catch(() => {
            alert('Server Not Responding');
          });

          fetch(getAllMatkulsURL, {
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
                  console.log('Matkul Succesfully Fetch:', data);
                  setMatkuls(data);
              }
            }).catch(() => {
              alert('Server Not Responding');
            });
      };

      const handleGetAllCoursesByMatkulId = () => {
        
        
        fetch(getAllCoursesByMatkulIdURL, {
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
                console.log('Partial Course Succesfully Fetch:', data);
                setCourses(data);
            }
          }).catch(() => {
            alert('Server Not Responding');
          });
      };

      const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    useEffect(() => {
        if (subject === "") {
            handleGetAllCourses();
        } else {
            handleGetAllCoursesByMatkulId();
        }
    }, [subject]);


    if (!courses || !matkuls) return null;

    if (cookies.user) {
        return (
            <>
                <Navigation /> 
                
                <section className="bg-gray-900 text-white min-h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    
                    <div className="mx-auto max-w-lg text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">DigiLab Courses</h2>
        
                    <p className="mt-4 text-gray-300">
                        Online Course available and managed by Digital Laboratory Asistants. Please choose the course that has been provided for you :D
                    </p>
                    
                    
                  
                </div>
                    <select
                        id="Subjects"
                        value={subject}
                        onChange={handleSubjectChange}
                        className=" ml-auto w-60 mt-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Choose a Subject</option>
                        {matkuls.map((matkul, index) => (
                            <option key={index} value={matkul.matkul_id}>{matkul.matkul_name}</option>
                        ))}
                        
                    </select>
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {courses.map((course, index) => (
                            <a 
                                key={index}
                                className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/100 hover:shadow-blue-500/50 flex hover:scale-105"
                                href={`/Course/${course.course_id}`}
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
            </>
        );
    }
}

export default Courses;