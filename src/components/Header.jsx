import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { logo } from '../utils/constants';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({
          uid,
          email,
          displayName,
          photoURL
        }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch(() => {
      navigate("/error");
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full min-w-[420px] bg-gradient-to-b from-black fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3">
        
        {/* Logo + Nav */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <img
            src={logo}
            alt="Netflix-logo"
            className="w-24 sm:w-32 h-auto cursor-pointer"
            onClick={() => navigate("/browse")}
          />

          {/* Navigation links - hidden under 420px */}
          <ul className="hidden sm:flex space-x-3 sm:space-x-6 text-white font-medium text-sm sm:text-base">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">TV Shows</li>
            <li className="cursor-pointer">Movies</li>
            <li className="cursor-pointer">New & Popular</li>
            <li className="cursor-pointer">My List</li>
            <li className="cursor-pointer">Languages</li>
          </ul>
        </div>

        {/* User avatar & menu */}
        {user && (
          <div className="flex items-center relative space-x-2">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <button onClick={toggleMenu} className="text-white text-lg sm:text-xl">
              ☰
            </button>

            {isOpen && (
              <div className="absolute right-0 top-12 sm:top-14 w-40 sm:w-48 bg-gray-900 text-white rounded-xl shadow-lg ring-1 ring-white/10 z-50 animate-fadeIn">
                <ul className="py-2 text-sm sm:text-base space-y-1">
                  <li
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md">
                    About
                  </li>
                  <li
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer font-semibold rounded-md"
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
