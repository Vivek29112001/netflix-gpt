import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, SetErrorMessage] = useState(null)

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    const handleButtonClick = () => {
        //Validate the form data
        // console.log(email.current.value)
        // console.log(password.current.value)

        const message = checkValidData(email.current.value, password.current.value, name.current.value)
        SetErrorMessage(message);;

        //sign /sign up
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web/IN-en-20250421-TRIFECTA-perspective_dc5bcfdf-88a5-4972-8ffe-b28ff942f76e_large.jpg"
                    alt='background'
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='w-3/12 absolute p-12 bg-black/70 my-30 mx-auto right-0 left-0 text-white rounded-lg'>
                <h1 className='font-bold text-3xl py-2 mb-2'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                    ref={name}
                        type='text'
                        placeholder='Full Name'
                        className='p-4 my-4 w-full bg-gray-700'
                    />)}
                <input
                    ref={email}
                    type='text'
                    placeholder='Email Address'
                    className='p-4 my-4 w-full bg-gray-700'
                />
                <input
                    ref={password}
                    type="password"
                    placeholder='Password'
                    className='p-4 my-4 w-full bg-gray-700 '
                />
                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button
                    className='p-4 my-6 bg-red-600 w-full rounded-lg' onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className='py-4 cursor-pointer'
                    onClick={toggleSignInForm}>
                    {isSignInForm ? "New to NetFlix-GPT ? SignUp Now" : "Already registered ?Sign In now"}

                </p>
            </form>
        </div>
    )
}

export default Login
