import React, { useState } from 'react';

const VideoTitle = ({ title, overview }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full min-w-[320px] aspect-video text-white absolute bg-gradient-to-r from-black z-50 p-4 sm:p-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-4 px-14 sm:px-6">
        <h1
          className={`mt-[30vh] ml-[60px] text-3xl sm:text-5xl lg:text-6xl font-bold font-mono transition-transform duration-200 cursor-pointer
            ${
              hovered ? 'scale-105 sm:scale-105' : ''
            }`
          }
        >
          {title}
        </h1>

        <p
          className={`${
            hovered
              ? 'relative opacity-100 h-auto mb-2'
              : 'absolute opacity-0 h-0 overflow-hidden'
          } ml-[20px] w-1/3 transition-all duration-300 text-sm sm:text-base lg:text-lg text-gray-300`}
        >
          {overview}
        </p>

        <div className={`flex flex-wrap gap-3 ml-[60px] transition-all duration-300`}>
          <button className="flex items-center gap-2 bg-white text-black px-4 sm:px-6 py-2 rounded font-semibold hover:bg-gray-300 transition duration-200 opacity-90">
            <span className="text-black">▶️</span> Play
          </button>
          <button className="flex items-center gap-2 bg-gray-700 text-white px-4 sm:px-6 py-2 rounded border border-gray-400 hover:bg-gray-600 transition duration-200 opacity-90">
            <span className="text-black">ℹ️</span> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
