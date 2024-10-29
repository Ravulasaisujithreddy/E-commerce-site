import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {ThemeContext} from '../App';
import Input from './Input';
import { CiLight } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FilterContext } from '../Provider/FilterProvider';

function Navbar({ user, onLogin, displaySearch,handleSidebar}) {
  const handleLogout = () => {
    onLogin(null); // Call onLogin with null to log out
  };

  const {theme ,setTheme} = useContext(ThemeContext);
  const {setSearch}=useContext(FilterContext)
  const handleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  

  // Determine theme-based background and text colors
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-600';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const linkColor = theme === 'light' ? 'text-blue-500 hover:text-blue-700' : 'text-blue-300 hover:text-blue-500';

  return (
    <div>
  <nav className={`${bgColor} shadow-lg`}>
    <div className="container mx-auto px-6 py-3 flex items-center justify-between">
      
      {displaySearch && (
        <div className="p-2 cursor-pointer">
          <GiHamburgerMenu onClick={handleSidebar} />
        </div>
      )}

      <div className="flex space-x-6">
        <Link to="/" className={`${linkColor} font-medium hover:underline`}>
          Home
        </Link>
        <Link to="/cart" className={`${linkColor} font-medium hover:underline`}>
          Cart
        </Link>
        <Link to="/favourites" className={`${linkColor} font-medium hover:underline`}>
          Favourites
        </Link>
      </div>

      {displaySearch && (
        <div className="flex-grow px-4">
          <Input setSearch={setSearch} />
        </div>
      )}

      <div className="flex items-center space-x-4">
        {user !== 'guest' ? (
          <div className="flex items-center">
            <span className={`mr-4 ${textColor}`}>Welcome, {user}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Log In
          </Link>
        )}
        <div className="cursor-pointer text-xl">
          {theme === "light" ? <MdLightMode onClick={handleTheme} /> : <CiLight onClick={handleTheme} />}
        </div>
      </div>
    </div>
  </nav>
</div>

  );
}

export default Navbar;
