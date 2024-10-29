import React, { useContext, useRef } from 'react';
import { ThemeContext } from '../App';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

function Input({ setSearch }) {
  const { theme,setfilterType } = useContext(ThemeContext);
  const inputRef = useRef(null); // Add a ref to the input element

  const handleClose = () => {
    setSearch(''); // Clear the search state
    setfilterType("")
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input field value
    }
  };

  const handleSearch = (e) => {
    setfilterType("title")
    setSearch(e.target.value); // Update the search state
  };

  return (
    <div
      className={`flex items-center p-2 w-full max-w-lg mx-auto bg-white shadow-md rounded-full ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} border focus-within:ring-2 focus-within:ring-blue-500 transition duration-150`}
    >
      <IoIosSearch
        className={`text-xl ml-3 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}
      />
      <input
        ref={inputRef} // Attach the ref to the input
        type="text"
        onChange={handleSearch}
        className={`w-full bg-transparent text-sm p-3 focus:outline-none ${theme === 'light' ? 'text-gray-900' : 'text-black'} placeholder-gray-400`}
        placeholder="Search..."
      />
      <IoCloseOutline
        className={`text-2xl mr-3 cursor-pointer ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}
        onClick={handleClose}
      />
    </div>
  );
}

export default Input;
