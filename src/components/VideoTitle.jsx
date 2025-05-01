import React, { useState } from 'react';

const VideoTitle = ({ title, overview }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="pt-36 px-12 text-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1
        className={`text-6xl m-10 font-bold font-mono transition-transform duration-300 cursor-pointer w-1/4 ${
          hovered ? 'scale-120' : 'scale-100'
        }`}
      >
        {title}
      </h1>

      {hovered && (
        <p className="py-6 w-1/3 transition-all duration-300 text-lg text-gray-300">
          {overview}
        </p>
      )}
      <div className="flex gap-4 mt-4">
        <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition duration-200">
          Play
        </button>
        <button className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded border border-gray-400 hover:bg-gray-600 transition duration-200">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
