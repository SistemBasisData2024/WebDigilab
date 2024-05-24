import React, { useState } from 'react';
import axios from 'axios';

function AslabLogin() {
    const [aslab_email, setEmail] = useState('');
    const [aslab_password, setPassword] = useState('');
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:4000/login', {
            aslab_email: aslab_email,
            aslab_password: aslab_password
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
            <h1 className='text-5xl font-semibold'>Welcome Back</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your detail</p>
            <div>
                <form className='mt-8' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="aslab_email" className='text-lg font-medium'>Email</label>
                        <input
                            className='form-control w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Enter your email'
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='aslab_password' className='text-lg font-medium'>Password</label>
                        <input
                            name='aslab_password'
                            id='aslab_password'
                            className='form-control w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Enter your password'
                            type='password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success mt-3 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default AslabLogin;
