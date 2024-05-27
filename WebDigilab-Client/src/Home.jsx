import {useNavigate} from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie'
import {useEffect} from 'react'

import Navigation from "./Navigation";

function Home() {
    const [cookies, setCookie] = useCookies('user')
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the 'user' cookie exists
        if (!cookies.user) {
            navigate('/');
        } 
    }, [cookies, navigate]);

    if (cookies.user) {
        return(
            <>
            <Navigation isAslab={cookies.user.isAslab} />
            <section className="bg-gray-900 text-white flex flex-col justify-center items-center h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-10 lg:py-32">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl mb-8 leading-tight" style={{ paddingBottom: '0.5rem' }}>
                            Welcome, {cookies.user.isAslab ? cookies.user.data.aslab_name : cookies.user.data.praktikan_name}
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
                            This is the official website of Digital Laboratory DTE, where you can explore a variety of online courses here
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a className="block w-30 rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto" href="/Courses">
                                Get Started
                            </a>
                            {cookies.user.isAslab && (
                                <a className="block w-30 rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto" href="CoursesEdit">
                                    Edit Courses
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>
    
            </>
        );
    }
    
}

export default Home;