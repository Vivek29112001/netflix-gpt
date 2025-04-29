import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store=>store.user)

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            navigate("/error")
        })
    }
    return (
        <div className="flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 ">
            <h1
                className="text-red-600 font-black text-5xl mt-5"
                style={{
                    fontFamily: 'Arial Black, sans-serif',
                    letterSpacing: '2px',
                    transform: 'scaleY(1.2)', // stretch vertically a bit to match the arc effect
                }}
            >
                NETFLIX
            </h1>
            {user && (
                <div className='flex p-1'>
                <img className="w-12 h-12 mt-5 p-1 "src={user?.photoURL} alt='user-icon'/>
                <button 
                onClick={handleSignOut}
                className='font-bold text-white cursor-pointer'>(Sign Out)</button>
            </div>)}
        </div>
    )
}

export default Header
