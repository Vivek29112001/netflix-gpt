import React, { useState, useEffect, useRef } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import logo from '../assets/ChatFlix.png'
import { toggleGptSearchView } from '../utils/gptSlice'
import { SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants'
import { ChangeLanguage } from '../utils/configSlice'
import lang  from '../utils/languageConstants'; 

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();
    // const showGptSearch = useSelector(store=> store.gpt.showGptSearch)
    const langKey = useSelector((store) => store.config.lang)
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
    }, [dispatch, navigate]);

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
            .catch(() => {
                navigate("/error");
            });
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleGPTsearchButton = () => {
        // toggle GPT search modal
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        dispatch(ChangeLanguage(e.target.value))
    }

    return (
        // Responsive header: uses flex-col on small screens and flex-row on medium and up.
        <div className="fixed top-0 left-0 w-full z-60 flex flex-col md:flex-row md:justify-between items-center px-4 sm:px-6 md:px-10 py-4 bg-gradient-to-b from-black to-transparent">
            <div className="flex items-center space-x-4 sm:space-x-6">
                <img
                    src={logo}
                    alt="Netflix-logo"
                    className="w-24 sm:w-32 md:w-40 cursor-pointer"
                    onClick={() => navigate("/browse")}
                />
                {user && (
                    // This list is hidden on small screens; you can choose to show a mobile menu alternative.
                    <ul className="hidden md:flex space-x-4 text-white text-sm font-medium">
                        {lang[langKey]?.list?.map((item, key) => (
                            <li key={key} className="cursor-pointer hover:text-gray-300">
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {user && (
                <div className="flex items-center relative mt-3 md:mt-0">
                    <select 
                        className='bg-gray-900 text-white border-none rounded-md p-2 mr-4 cursor-pointer'
                        onChange={handleLanguageChange}
                    >
                        {SUPPORTED_LANGUAGES.map(langItem =>
                            <option key={langItem.identifier} value={langItem.identifier}>
                                {langItem.name}
                            </option>
                        )}
                    </select>
                    <button 
                        className='text-2xl font-bold text-white cursor-pointer mr-4'
                        onClick={handleGPTsearchButton}
                    >
                        GPT-Search
                    </button>
                    <img
                        src={user?.photoURL || USER_AVATAR}
                        alt="user-icon"
                        className="w-10 h-10 rounded cursor-pointer"
                    />
                    <button 
                        onClick={toggleMenu} 
                        ref={buttonRef} 
                        className="ml-2 text-white focus:outline-none"
                    >
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
                                <li 
                                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                                >
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
