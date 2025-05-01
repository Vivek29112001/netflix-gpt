import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../utils/firebase'
// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { USER_AVATAR } from '../utils/constants'

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, SetErrorMessage] = useState(null)

    // const navigate = useNavigate()
    const dispatch = useDispatch()

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

        const message = checkValidData(email.current.value, password.current.value)
        SetErrorMessage(message);
        if (message) return;

        //SIgn In Sign Up logic
        if (!isSignInForm) {
            // signup logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: USER_AVATAR,
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;  //sign in
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        }))
                        navigate("/browse")
                    }).catch((error) => {
                        SetErrorMessage(errorCode + "-" + errorMessage)
                    })
                    // console.log(user)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    SetErrorMessage(errorCode + "-" + errorMessage)
                });
        } else {
            // SIgn in logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user)
                    // navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log(errorCode + "-" + errorMessage)
                });
        }

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
