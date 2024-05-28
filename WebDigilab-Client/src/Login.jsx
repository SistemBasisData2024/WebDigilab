import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie'
import Spline from "@splinetool/react-spline";

function Login() {
    const [cookies, setCookie] = useCookies(['user'])
    const navigate = useNavigate();

    const loginAccountAslabURL = "http://localhost:4000/loginAccountAslab"
    const loginAccountPraktikanURL = "http://localhost:4000/loginAccountPraktikan"

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const text = "Login to DigiLab Account";
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex <= text.length) {
                setTypedText(text.substring(0, currentIndex));
                currentIndex++;
            } else {
                setLoading(false);
                clearInterval(intervalId);
            }
        }, 100); // Typing speed: 100 milliseconds per character

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleLoginAccountAslab = (event) => {
        
        event.preventDefault();
        const form = event.target.form;
        if (!form.checkValidity()) {
            alert("Please fill in the required field !");
            return;
        }
        const params = new URLSearchParams();
        
        params.append('aslab_email', Email);
        params.append('aslab_password', Password);

        fetch(loginAccountAslabURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        })
          .then(response => {
            if (response.status == 400) {
                alert('Please fill in the required field!');
                return false;
            }
            else if (response.status == 401) {
                alert('User not Found');
                return false;
            }
            else if (response.status == 402) {
                alert('Password Incorrect');
                return false;
            }
            else if (!response.ok) {
                alert('Server Not Responding');
                return false;
            }
            return response.json();
          })
          .then(data => {
            if (data) {
                console.log('Login successfully:', data);
                setCookie('user', {data:data, isAslab: true}, { path: '/' })
                navigate("/home");
            }
          }).catch(() => {
            alert('Server Not Responding');
          });
      };

      const handleLoginAccountPraktikan = (event) => {

        event.preventDefault();
        const form = event.target.form;
        if (!form.checkValidity()) {
            alert("Please fill in the required field!");
            return;
        }

        const params = new URLSearchParams();
        
        params.append('praktikan_email', Email);
        params.append('praktikan_password', Password);
        

        fetch(loginAccountPraktikanURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        })
          .then(response => {
            if (response.status == 400) {
                alert('Please fill in the required field!');
                return false;
            }
            else if (response.status == 401) {
                alert('User not found');
                return false;
            }
            else if (response.status == 402) {
                alert('Password Incorrect');
                return false;
            }
            else if (!response.ok) {
                alert('Server Not Responding');
                return false;
            }
            return response.json();
          })
          .then(data => {
            if (data) {
                console.log('Login successfully:', data);
                setCookie('user', {data:data, isAslab: false}, { path: '/' })
                navigate("/home");
            }
          }).catch(() => {
            alert('Server Not Responding');
          });
      };


      return (
        <section className="relative h-screen">
        {loading && (
            <img
                alt=""
                src="/embedded-system-micro.jpg"
                className="absolute inset-0 h-full w-full object-cover"
            />
        )}
        <Spline
            scene="https://prod.spline.design/bHyEsq69KAznj0Ub/scene.splinecode"
            className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-md p-8 hover:scale-[102%] duration-300 ease-in-out bg-opacity-40 backdrop-blur-lg bg-black rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-white mb-8 text-center">
                    {loading ? typedText : "Login to DigiLab Account"}
                </h1>
                <form className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-white"> Email </label>
                        <input
                            type="email"
                            id="Email"
                            name="email"
                            className="mt-1 w-full rounded-md border-gray-200 bg-white hover:bg-black hover:text-white text-sm text-gray-700 shadow-sm"
                            required
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="Password" className="block text-sm font-medium text-white"> Password </label>
                        <input
                            type="password"
                            id="Password"
                            name="password"
                            className="mt-1 w-full rounded-md border-gray-200 bg-white hover:bg-black hover:text-white text-sm text-gray-700 shadow-sm"
                            required
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="w-1/2 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black focus:outline-none focus:ring focus:ring-blue-200 mr-2"
                            onClick={handleLoginAccountPraktikan}
                        >
                            Login
                        </button>
                        <button
                            className="w-1/2 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black focus:outline-none focus:ring focus:ring-blue-200 ml-2"
                            onClick={handleLoginAccountAslab}
                        >
                            I'm Assistant
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-gray-500">
                    <>Don't have an account? </>
                    <a href="/Register" className="text-white hover:underline">Sign Up</a>.
                </p>
            </div>
        </div>
    </section>
    );
}

export default Login;