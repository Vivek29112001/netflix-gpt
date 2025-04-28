import React from 'react'

const Header = () => {
    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 mt-5">
            <h1
                className="text-red-600 font-black text-5xl"
                style={{
                    fontFamily: 'Arial Black, sans-serif',
                    letterSpacing: '2px',
                    transform: 'scaleY(1.2)', // stretch vertically a bit to match the arc effect
                }}
            >
                NETFLIX
            </h1>
        </div>
    )
}

export default Header
