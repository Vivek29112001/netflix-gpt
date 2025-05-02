import React, { useState, useEffect, useRef } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { logo } from '../utils/constants'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, []);

    // Close menu on outside click or on window resize
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleResize = () => {
            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleOutsideClick);
        window.addEventListener("resize", handleResize);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => { })
            .catch((error) => {
                navigate("/error");
            });
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        // Netflix-like header: fixed, full width with a gradient background, using flex row layout so the logo stays fixed on the left
        <div className="fixed top-0 left-0 w-full z-60 flex flex-row justify-between items-center px-6 sm:px-10 py-3 bg-gradient-to-b from-black to-transparent">
            <div className="flex items-center space-x-6">
                <img
                    src={logo}
                    alt="Netflix-logo"
                    className="w-32 h-12 cursor-pointer"
                    onClick={() => navigate("/browse")}
                />
                {user && (
                    <ul className="hidden md:flex space-x-4 text-white text-sm font-medium">
                        <li className="cursor-pointer hover:text-white">Home</li>
                        <li className="cursor-pointer hover:text-white">TV Shows</li>
                        <li className="cursor-pointer hover:text-white">Movies</li>
                        <li className="cursor-pointer hover:text-white">New & Popular</li>
                        <li className="cursor-pointer hover:text-white">My List</li>
                        <li className="cursor-pointer hover:text-white">Browse by Language</li>
                    </ul>
                )}
            </div>
            
            {user && (
                <div className="flex items-center relative">
                    <img
                        src={user?.photoURL}
                        alt="user-icon"
                        className="w-10 h-10 rounded cursor-pointer"
                    />
                    <button onClick={toggleMenu} ref={buttonRef} className="ml-2 text-white focus:outline-none">
                        ☰
                    </button>
                    {isOpen && (
                        <div ref={menuRef} className="absolute right-0 top-full mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg ring-1 ring-white/10 animate-fadeIn">
                            <ul className="py-2">
                                <li
                                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                                    onClick={() => navigate("/profile")}
                                >
                                    Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                    About
                                </li>
                                <li
                                    className="font-bold px-4 py-2 hover:bg-gray-800 cursor-pointer"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
