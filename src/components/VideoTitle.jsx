import React, { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

const VideoTitle = ({ title, overview }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-screen aspect-video pt-[18%] px-24 text-white absolute bg-gradient-to-r from-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1
        className={`text-5xl m-10  font-bold font-mono px-2 py-2 transition-transform duration-200 cursor-pointer w-1/3 ${
          hovered ? 'scale-120 text-6xl' : 'scale-120'
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
        <button className="flex items-center gap-2  bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition duration-200 opacity-80">
          <PlayArrowIcon className="text-black" />
          Play
        </button>
        <button className="flex items-center gap-2  bg-gray-700 text-white px-6 py-2 rounded border border-gray-400 hover:bg-gray-600 transition duration-200 opacity-80 ">
          <InfoOutlineIcon className="text-white" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
