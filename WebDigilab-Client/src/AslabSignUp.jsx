import React, { useState } from 'react';
import Spline from "@splinetool/react-spline";

function AslabSignUp() {

    const createAccountAslabURL = "http://localhost:4000/createAccountAslab"

    const [full_name, setFull_name] = useState('');
    const [npm, setNpm] = useState('');
    const [profile_picture, setProfile_picture] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeat_password] = useState('');


    const handleCreateAccount = () => {

        const params = new URLSearchParams();
        
        params.append('aslab_name', full_name);
        params.append('aslab_npm', npm);
        params.append('aslab_profile_picture', profile_picture);
        params.append('aslab_bio', bio);
        params.append('aslab_email', email);
        params.append('aslab_password', password);
        
        if (password !== repeat_password) {
            alert("Passwords do not match");
            return;
        }

        fetch(createAccountAslabURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        })
          .then(response => {
            if (response.status == 400) {
                alert('NPM sudah terdaftar');
            }
            else if (response.status == 401) {
                alert('Email sudah digunakan')
            }
            else if (!response.ok) {
                alert('Server Not Responding');
            }
            return response.json();
          })
          .then(data => {
            console.log('Create Account successfully:', data);
            alert('Akun berhasil dibuat')
          }).catch(error => {
            alert('Server Not Responding');
          });
      };

    return (
        <div className="flex min-h-screen bg-gray-100 items-center justify-center">
            <div className="flex justify-center items-center w-full max-w-5xl mx-auto mt-20 mb-20">
                <div className="w-full max-w-2xl bg-white p-16 rounded-2xl shadow-lg">
                    <div className="flex justify-center items-center mb-6 h-48 w-full">
                        <div className="flex justify-center items-center h-40 w-40">
                            <Spline scene="https://prod.spline.design/GzRnCGNlgrVZJUS4/scene.splinecode" />
                        </div>
                    </div>
                    <h2 className="text-center text-2xl font-bold mb-24">Digital Laboratory Assistant Registration</h2>
                    <div className="relative z-0 w-full mb-10 group">
                        <input type="text" name="full_name" id="full_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                        />
                        <label htmlFor="full_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Full Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input type="number" name="npm" id="npm" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            value={npm}
                            onChange={(e) => setNpm(e.target.value)} 
                        />
                        <label htmlFor="npm" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">NPM</label>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input type="text" name="profile_picture" id="profile_picture" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                            value={profile_picture}
                            onChange={(e) => setProfile_picture(e.target.value)}
                        />
                        <label htmlFor="profile_picture" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Profile Picture Link</label>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Email address</label>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Password</label>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input type="password" name="repeat_password" id="repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                        value={repeat_password}
                        onChange={(e) => setRepeat_password(e.target.value)} />
                        <label htmlFor="repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Confirm password</label>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <textarea name="bio" id="bio" className="block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                         ></textarea>
                        <label htmlFor="bio" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Bio</label>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 mb-8 mt-8 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={() => handleCreateAccount()}>Create Account</button>
                        <a href="/login" className="text-blue-500 underline text-sm hover:text-blue-800">Already have an account?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AslabSignUp;
