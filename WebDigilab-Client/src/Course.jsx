import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

function Course() {
  const { courseId } = useParams();
  const getAllChaptersByCourseIdURL = `http://localhost:4000/getAllChapters/${courseId}`;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cookies, setCookie] = useCookies('user');
  const [chapters, setChapters] = useState(null);
  const [link, setLink] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check if the 'user' cookie exists
    if (!cookies.user) {
      navigate('/');
    } else {
      handleGetAllChapters();
    }
  }, [cookies, navigate]);

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
          if (data.length > 0) {
            setLink(data[0].chapter_link); // Set the initial link to the first chapter
          }
          else {
            navigate("/Home")
          }
        }
      }).catch(() => {
        alert('Server Not Responding');
      });
  };

  const handleClickChapter = (chapterLink) => {
    setLink(chapterLink);
  };

  if (!chapters || !link) return null;

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-50">
        <Navigation />
      </nav>

      <div className="flex">
        {isSidebarOpen && (
          <aside
            id="logo-sidebar"
            className="fixed top-16 left-0 z-40 w-64 h-screen pt-4 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-900 dark:border-gray-900"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-900">
              <ul className="space-y-2 font-medium">
                {chapters.map((chapter, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleClickChapter(chapter.chapter_link)}
                      className="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="ms-3">{chapter.chapter_no}. {chapter.chapter_title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'sm:ml-64' : 'ml-0'}`}>
          <button
            className="absolute bottom-4 left-4 bg-white border-2 border-gray-900 rounded-full p-2 z-50"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
          <div className="pt-16">
            <iframe
              src={link}
              className="w-full h-[calc(100vh-64px)]"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
