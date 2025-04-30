import React, { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { logo } from '../utils/constants'
import { Link } from 'react-router-dom'
// import { USER_AVATAR } from '../utils/constants'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(store => store.user)

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;  //sign in
                dispatch(addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                }))
                navigate("/browse")
            } else {
                //signup
                dispatch(removeUser())
                navigate("/")
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => { })
            .catch((error) => {
                navigate("/error")
            })
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className="flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 ">
            <div className='flex items-center space-x-4'>
                <img
                    src={logo} alt='Netflix-logo' className='w-32 h-12 mt-2 cursor-pointer mr-12' onClick={() => navigate("/browse")}
                />
                <ul className='flex space-x-4 text-white mt-2 font-semibold justify-normal items-center '>
                    <li>Home</li>
                    <li>TVShows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li> MyList</li>
                    <li>Browse by Language</li>
                </ul>
            </div>

            {user && (
                <div className='flex p-1'>
                    <img className="w-10 h-10 mt-2 p-1" src={user?.photoURL} alt='user-icon' />

                    <button onClick={toggleMenu} className='p-2 text-white'>☰</button>
                    {isOpen && (
                        <div className="absolute right-0 mt-4 w-48 bg-gray-900 text-white rounded-xl shadow-lg ring-1 ring-white/10 z-50 animate-fadeIn">
                            <ul className="py-2 space-y-1">
                                <li
                                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md transition duration-200"
                                    onClick={() => navigate("/profile")}
                                >
                                    Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md transition duration-200">About</li>
                                {user && (
                                    <li onClick={handleSignOut} className='font-bold text-white px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md transition duration-200'>
                                        Sign Out
                                    </li>
                                )}

                            </ul>
                        </div>
                    )}
                </div>)}
        </div>
    )
}

export default Header
