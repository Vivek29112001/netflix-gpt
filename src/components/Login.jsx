import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../utils/firebase'
// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { USER_AVATAR } from '../utils/constants'
import { BG_URL } from '../utils/constants'

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
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value)
        SetErrorMessage(message);
        if (message) return;

        // Sign In / Sign Up logic
        if (!isSignInForm) {
            // Sign up logic
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
                        // navigate("/browse")
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        SetErrorMessage(errorCode + "-" + errorMessage)
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    SetErrorMessage(errorCode + "-" + errorMessage)
                });
        } else {
            // Sign in logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    SetErrorMessage(errorCode + " - " + errorMessage);
                });
        }
    }

    return (
        <div className="relative min-h-screen">
            <Header />
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <img
                    className="w-full h-full object-cover"
                    src={BG_URL}
                    alt="background"
                />
            </div>
            {/* Form Container */}
            <div className="flex flex-col items-center pt-10 sm:pt-20">
                <div className="w-full max-w-md bg-black/70 rounded-lg p-6 sm:p-8 mx-4">
                    <h1 className="font-bold text-2xl sm:text-3xl py-1 mb-2 text-white text-center">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>
                    {!isSignInForm && (
                        <input
                            ref={name}
                            type="text"
                            placeholder="Full Name"
                            className="p-4 my-4 w-full bg-gray-700 rounded"
                        />
                    )}
                    <input
                        ref={email}
                        type="text"
                        placeholder="Email Address"
                        className="p-4 my-4 w-full bg-gray-700 rounded"
                    />
                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="p-4 my-4 w-full bg-gray-700 rounded"
                    />
                    <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                    <button
                        className="p-4 my-6 bg-red-600 w-full rounded-lg text-white text-xl font-bold"
                        onClick={handleButtonClick}>
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>
                    <p
                        className="py-4 cursor-pointer text-center text-white"
                        onClick={toggleSignInForm}>
                        {isSignInForm ? "New to NetFlix-GPT ? SignUp Now" : "Already registered ? Sign In now"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
