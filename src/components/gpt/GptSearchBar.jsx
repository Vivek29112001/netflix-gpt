import React from 'react';
import lang  from '../../utils/languageConstants'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';

const GptSearchBar = () => {

  const langKey = useSelector((store)=> store.config.lang)

  return (
    <div className="m-[20%] items-center justify-center ">
      <form className="bg-white shadow-lg rounded-lg overflow-hidden sm:flex w-full max-w-4xl">
        <input
          type="text"
          className="w-full p-4 text-gray-800 focus:outline-none"
          placeholder={lang[langKey].gptSearchPlaceHolder} // Adjust the language key as necessary
        />
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-18 transition"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;