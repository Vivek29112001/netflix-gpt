import React from 'react';
import { useSelector } from 'react-redux';
import { USER_AVATAR } from '../../utils/constants';
import logo from '../../assets/ChatFlix.png'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import Header from "../Header"

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-6">
            
            <img 
                src={logo} 
                onClick={() => navigate("/browse")}
                alt='Netflix-logo' 
                className='w-28 sm:w-32 h-auto mt-2 cursor-pointer'
            />

            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mt-6">
                <div className="flex flex-col items-center">
                    <img 
                        className="w-20 h-20 rounded-full border-4 border-red-600" 
                        src={user?.photoURL || USER_AVATAR} 
                        alt="User avatar" 
                    />
                    <h1 className="text-xl sm:text-2xl font-semibold mt-4 text-center">
                        {user?.displayName || "User Name"}
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base text-center break-words">
                        {user?.email || "user@example.com"}
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg sm:text-xl font-semibold border-b pb-2">Profile Details</h3>
                    <ul className="mt-4 space-y-2 text-sm sm:text-base">
                        <li>
                            <span className="font-medium">UID:</span> {user?.uid || "Not available"}
                        </li>
                        <li>
                            <span className="font-medium">Email:</span> {user?.email || "Not available"}
                        </li>
                        <li>
                            <span className="font-medium">Name:</span> {user?.displayName || "Not available"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
