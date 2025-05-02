import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, SetErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        SetErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: USER_AVATAR,
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid, email, displayName, photoURL }));
                        // navigate("/browse")
                    }).catch((error) => {
                        SetErrorMessage(error.code + ' - ' + error.message);
                    });
                })
                .catch((error) => {
                    SetErrorMessage(error.code + ' - ' + error.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // navigate("/browse")
                })
                .catch((error) => {
                    SetErrorMessage(error.code + ' - ' + error.message);
                });
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Header />
            {/* Background image that covers entire screen */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <img
                    className="w-full h-full object-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web/IN-en-20250421-TRIFECTA-perspective_dc5bcfdf-88a5-4972-8ffe-b28ff942f76e_large.jpg"
                    alt="background"
                />
            </div>

            <form
                onSubmit={(e) => e.preventDefault()}
                className="
    w-[90%] sm:w-96 md:w-[400px] lg:w-[450px]
    bg-black/70 
    mx-auto mt-36 
    px-6 sm:px-8 
    py-8 sm:py-12 
    rounded-xl 
    text-white 
    shadow-2xl 
    min-h-[350px] sm:min-h-[420px] md:min-h-[480px]
    flex flex-col justify-center
    transition-all duration-300 ease-in-out
  "
            >
                <h1 className="font-bold text-2xl sm:text-3xl mb-14 text-center">
                    {isSignInForm ? 'Sign In' : 'Sign Up'}
                </h1>

                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="p-3 my-3 w-full bg-gray-700 rounded"
                    />
                )}

                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="p-3 my-3 w-full bg-gray-700 rounded"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-3 my-3 w-full bg-gray-700 rounded"
                />

                {errorMessage && (
                    <p className="text-red-500 text-sm py-2">{errorMessage}</p>
                )}

                <button
                    className="p-3 my-5 bg-red-600 w-full rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? 'Sign In' : 'Sign Up'}
                </button>

                <p
                    className="text-center text-sm sm:text-base cursor-pointer underline"
                    onClick={toggleSignInForm}
                >
                    {isSignInForm
                        ? 'New to NetFlix-GPT? Sign Up Now'
                        : 'Already registered? Sign In now'}
                </p>
            </form>


        </div>
    );
};

export default Login;
