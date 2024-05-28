import React, { useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie'

function Navigation() {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    // Function to handle logout
    const handleLogout = () => {
        // Remove the 'user' cookie
        removeCookie('user');
    };

    useEffect(() => {
        const userMenuButton = document.getElementById('user-menu-button');
        const userDropdown = document.getElementById('user-dropdown');
        const navToggleButton = document.getElementById('nav-toggle-button');
        const navDropdown = document.getElementById('nav-dropdown');
        

        const closeAllDropdowns = () => {
            userDropdown.classList.add('hidden');
            navDropdown.classList.add('hidden');
        };

        const toggleDropdown = (event) => {
            event.stopPropagation();
            closeAllDropdowns();
            userDropdown.classList.toggle('hidden');
        };

        const toggleNavDropdown = (event) => {
            event.stopPropagation();
            closeAllDropdowns();
            navDropdown.classList.toggle('hidden');
        };

        const handleClickOutside = (event) => {
            if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target) &&
                !navToggleButton.contains(event.target) && !navDropdown.contains(event.target)) {
                closeAllDropdowns();
            }
        };

        userMenuButton.addEventListener('click', toggleDropdown);
        navToggleButton.addEventListener('click', toggleNavDropdown);
        document.addEventListener('click', handleClickOutside);

        // Cleanup event listeners on unmount
        return () => {
            userMenuButton.removeEventListener('click', toggleDropdown);
            navToggleButton.removeEventListener('click', toggleNavDropdown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="relative flex items-center space-x-3 rtl:space-x-reverse">
            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false">
                <span className="sr-only">Open user menu</span>
                
                <img className="w-8 h-8 rounded-full" src={
                    cookies.user.isAslab ? 
                    (cookies.user.data.aslab_profile_picture != null && cookies.user.data.aslab_profile_picture != 'null' && cookies.user.data.aslab_profile_picture != '' )? cookies.user.data.aslab_profile_picture : '/profile_picture.png' :
                    (cookies.user.data.praktikan_profile_picture != null && cookies.user.data.aslab_profile_picture != 'null' && cookies.user.data.aslab_profile_picture != '') ? cookies.user.data.praktikan_profile_picture : '/profile_picture.png'
                } alt="user photo" />
            </button>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute left-0 top-full mt-2 w-48" id="user-dropdown">
                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                        {cookies.user.isAslab ? cookies.user.data.aslab_email : cookies.user.data.praktikan_email}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {cookies.user.isAslab ? 
                        (cookies.user.data.aslab_bio != null && cookies.user.data.aslab_bio != 'null' && cookies.user.data.aslab_bio != '') ? cookies.user.data.aslab_bio : 'no bio' :
                        (cookies.user.data.praktikan_bio != null && cookies.user.data.praktikan_bio != 'null' && cookies.user.data.praktikan_bio != '') ? cookies.user.data.praktikan_bio : 'no bio' }
                    </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    
                    <li>
                        <a href="/AccountSetting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                    </li>
                    
                    <li>
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>Log out</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="relative flex items-center md:order-1 space-x-3 md:space-x-0 ">
            <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" id="nav-toggle-button">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-full mt-2 w-48" id="nav-dropdown">
                <ul className="py-2" aria-labelledby="nav-toggle-button">
                    <li>
                        <a href="/Home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</a>
                    </li>
                    <li>
                        <a href="/Courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Courses</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Contact</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">About</a>
                    </li>
                    
                    {cookies.user.isAslab && (
                    <li>
                        <a href="/CoursesEdit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Courses</a>
                    </li>
                    )}
                    
                    
                </ul>
            </div>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="/Home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Home</a>
                </li>

                <li>
                    <a href="/Courses" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Courses</a>
                </li>
                
                <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>

                <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                </li>
                
                {cookies.user.isAslab && (
                <li>
                    <a href="/CoursesEdit" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Edit Courses</a>
                </li>
                )}
            </ul>
        </div>
    </div>
</nav>
    );
}

export default Navigation;
