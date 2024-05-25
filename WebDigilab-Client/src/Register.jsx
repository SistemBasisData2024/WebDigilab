import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import Spline from "@splinetool/react-spline";

function Register() {

    const navigate = useNavigate();

    const createAccountAslabURL = "http://localhost:4000/createAccountAslab"
    const createAccountPraktikanURL = "http://localhost:4000/createAccountPraktikan"

    const [Name, setName] = useState('');
    const [Npm, setNpm] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(true);

    const handleCreateAccountAslab = (event) => {
        
        event.preventDefault();
        const form = event.target.form;
        if (!form.checkValidity()) {
            alert("Please fill in the required field !");
            return;
        }
        const params = new URLSearchParams();
        
        params.append('aslab_name', Name);
        params.append('aslab_npm', Npm);
        params.append('aslab_email', Email);
        params.append('aslab_password', Password);
        
        if (Password !== PasswordConfirmation) {
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
                return false;
            }
            else if (response.status == 401) {
                alert('Email sudah digunakan');
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
                console.log('Create Account successfully:', data);
                alert('Akun berhasil dibuat')
                navigate("/")
            }
          }).catch(() => {
            alert('Server Not Responding');
          });
      };

      const handleCreateAccountPraktikan = (event) => {

        event.preventDefault();
        const form = event.target.form;
        if (!form.checkValidity()) {
            alert("Please fill in the required field !");
            return;
        }

        const params = new URLSearchParams();
        
        params.append('praktikan_name', Name);
        params.append('praktikan_npm', Npm);
        params.append('praktikan_email', Email);
        params.append('praktikan_password', Password);
        
        if (Password !== PasswordConfirmation) {
            alert("Passwords do not match");
            return;
        }

        fetch(createAccountPraktikanURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        })
          .then(response => {
            if (response.status == 400) {
                alert('NPM sudah terdaftar');
                return false;
            }
            else if (response.status == 401) {
                alert('Email sudah digunakan');
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
                console.log('Create Account successfully:', data);
                alert('Akun berhasil dibuat')
                navigate("/")
            }
          }).catch(() => {
            alert('Server Not Responding');
          });
      };


      return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-first lg:col-span-5 lg:h-full xl:col-span-6">
                    {loading && (
                        <img
                        alt=""
                        src="/embedded-system-micro.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                        />
                    )}
                    <Spline
                        scene="https://prod.spline.design/bHyEsq69KAznj0Ub/scene.splinecode"
                        onLoad={() => setLoading(false)}
                    />
                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">

                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Register your DigiLab Account
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            Fill in the forms below to register your data. Click the "Assistant Account" button if you want to register as an Assistant Account or click the "Normal Account" button if you're a student.
                        </p>

                        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="Name"
                                    name="Name"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    required
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Npm" className="block text-sm font-medium text-gray-700">
                                    Npm
                                </label>
                                <input
                                    type="number"
                                    id="Npm"
                                    name="Npm"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    required
                                    value={Npm}
                                    onChange={(e) => setNpm(e.target.value)}
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    required
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    required
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                    Password Confirmation
                                </label>
                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="password_confirmation"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    required
                                    value={PasswordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                />
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                </p>
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="MarketingAccept" className="flex gap-4">
                                    <input
                                        type="checkbox"
                                        id="MarketingAccept"
                                        name="marketing_accept"
                                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                                        required
                                    />
                                    <span className="text-sm text-gray-700">
                                        I agree to the terms and conditions
                                    </span>
                                </label>
                            </div>

                            <div className="col-span-6 flex justify-center mt-6 gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    onClick={handleCreateAccountPraktikan}
                                >
                                    Normal Account
                                </button>
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    onClick={handleCreateAccountAslab}
                                >
                                    Assistant Account
                                </button>
                                
                            </div>
                        </form>

                        <div className="col-span-6 mt-4 text-center">
                            <p className="text-sm text-gray-500">
                                Already have an account?
                                <a href="/" className="text-gray-700 underline"> Log in</a>.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default Register;