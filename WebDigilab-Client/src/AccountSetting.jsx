import {useState, useEffect} from 'react';
import { CookiesProvider, useCookies } from 'react-cookie'
import {useNavigate} from "react-router-dom";
import Navigation from "./Navigation";

function AccountSetting () {
    const updateAccountPraktikanURL = "http://localhost:4000/updateAccountPraktikan"
    const updateAccountAslabURL = "http://localhost:4000/updateAccountAslab"
    const deleteAccountPraktikanURL = "http://localhost:4000/deleteAccountPraktikan"
    const deleteAccountAslabURL = "http://localhost:4000/deleteAccountAslab"

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [Name, setName] = useState(cookies.user.isAslab ? cookies.user.data.aslab_name : cookies.user.data.praktikan_name);
    const [Npm, setNpm] = useState(cookies.user.isAslab ? cookies.user.data.aslab_npm : cookies.user.data.praktikan_npm);
    const [Bio, setBio] = useState(cookies.user.isAslab ? cookies.user.data.aslab_bio : cookies.user.data.praktikan_bio);
    const [ProfilePicture, setProfilePicture] = useState(cookies.user.isAslab ? cookies.user.data.aslab_profile_picture : cookies.user.data.praktikan_profile_picture);
    const [Email, setEmail] = useState(cookies.user.isAslab ? cookies.user.data.aslab_email : cookies.user.data.praktikan_email);
    const [Password, setPassword] = useState('');
    const [PasswordConfirmation, setPasswordConfirmation] = useState('');
    
    const handleUpdateAccount = (event) => {

        event.preventDefault();
        const form = event.target.form;
        if (!form.checkValidity()) {
            alert("Please fill in the required field !");
            return;
        }
        if (Password !== PasswordConfirmation) {
            alert("Passwords do not match");
            return;
        }

        const params = new URLSearchParams();

        if (cookies.user.isAslab == false) {
            params.append('praktikan_id', cookies.user.data.praktikan_id)
            params.append('praktikan_name', Name);
            params.append('praktikan_npm', Npm);
            params.append('praktikan_bio', Bio);
            params.append('praktikan_profile_picture', ProfilePicture);
            params.append('praktikan_email', Email);
            params.append('praktikan_password', Password);
        
            fetch(updateAccountPraktikanURL, {
            method: 'PUT',
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
                    console.log('Update Account successfully:', data);
                    setCookie('user', {data:data, isAslab: false}, { path: '/' })
                    navigate("/Home")
                }
            }).catch(() => {
                alert('Server Not Responding');
            });
        }
        else {
            params.append('aslab_id', cookies.user.data.aslab_id)
            params.append('aslab_name', Name);
            params.append('aslab_npm', Npm);
            params.append('aslab_bio', Bio);
            params.append('aslab_profile_picture', ProfilePicture);
            params.append('aslab_email', Email);
            params.append('aslab_password', Password);
        
            fetch(updateAccountAslabURL, {
            method: 'PUT',
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
                    console.log('Update Account successfully:', data);
                    setCookie('user', {data:data, isAslab: true}, { path: '/' })
                    navigate("/Home")
                }
            }).catch(() => {
                alert('Server Not Responding');
            });
        }
        
      };

      const handleDeleteAccount = (event) => {

        event.preventDefault();

        const params = new URLSearchParams();

        if (cookies.user.isAslab == false) {
            params.append('praktikan_id', cookies.user.data.praktikan_id)
        
            fetch(deleteAccountPraktikanURL, {
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
                    console.log('Delete Account successfully:', data);
                    removeCookie('user');
                    navigate("/")
                }
            }).catch(() => {
                alert('Server Not Responding');
            });
        }
        else {
            params.append('aslab_id', cookies.user.data.aslab_id)
        
            fetch(deleteAccountAslabURL, {
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
                    console.log('Delete Account successfully:', data);
                    removeCookie('user');
                    navigate("/")
                }
            }).catch(() => {
                alert('Server Not Responding');
            });
        }
        
      };

    return (
        <>
        <Navigation />
        <section className="h-full flex items-center justify-center dark:bg-gray-900">
            <div className="max-w-3xl w-full px-8 py-8 sm:px-12 lg:px-16 lg:py-12 xl:px-20">
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white text-center">
                    Account Settings
                </h1>

                <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="Name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Name
                        </label>

                        <input
                            type="text"
                            id="Name"
                            name="Name"
                            defaultValue={cookies.user.isAslab ? cookies.user.data.aslab_name : cookies.user.data.praktikan_name}
                            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label
                        htmlFor="Npm"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                        NPM
                        </label>

                        <input
                        type="number"
                        id="Npm"
                        name="Npm"
                        defaultValue={cookies.user.isAslab ? cookies.user.data.aslab_npm : cookies.user.data.praktikan_npm}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        readOnly
                        />
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Bio" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Bio
                        </label>

                        <input
                        type="text"
                        id="Bio"
                        name="Bio"
                        defaultValue={cookies.user.isAslab ? cookies.user.data.aslab_bio : cookies.user.data.praktikan_bio}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Profile_Picture" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Profile Picture Link
                        </label>

                        <input
                        type="text"
                        id="Profile_Picture"
                        name="Profile_Picture"
                        defaultValue={cookies.user.isAslab ? cookies.user.data.aslab_profile_picture: cookies.user.data.praktikan_profile_picture}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        onChange={(e) => setProfilePicture(e.target.value)}
                        />
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email
                        </label>

                        <input
                        type="email"
                        id="Email"
                        name="email"
                        defaultValue={cookies.user.isAslab ? cookies.user.data.aslab_email : cookies.user.data.praktikan_email}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        readOnly
                        />
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="New_Password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        New Password
                        </label>

                        <input
                        type="password"
                        id="New_Password"
                        name="New_Password"
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="Password_Confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Password Confirmation
                        </label>

                        <input
                        type="password"
                        id="Password_Confirmation"
                        name="Password_Confirmation"
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>

                    <div className="col-span-6 sm:flex sm:items-center sm:justify-between">
                        <button
                            className="w-40 inline-block bg-blue-600 text-white px-12 py-3 rounded-md text-sm font-medium transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                            onClick={handleUpdateAccount}
                        >
                            Update
                        </button>

                        <button
                            className="w-40 inline-block bg-red-600 text-white px-12 py-3 rounded-md text-sm font-medium transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500 dark:hover:bg-red-700 dark:hover:text-white mt-4 sm:mt-0"
                            onClick={handleDeleteAccount}
                        >
                            Delete 
                        </button>
                    </div>
                </form>
            </div>
        </section>
        </>
    )
}

export default AccountSetting;
