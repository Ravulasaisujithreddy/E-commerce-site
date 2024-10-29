// src/components/Products.js
import React, { useContext} from 'react';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App'; // Import your ThemeContext
import Loading from './Loading';
import Sidebar from './Sidebar';
import RatingDisplay from './Ratings';

function Products({ products, isLoading, liked, handleLike ,displaysidebar}) {
  const { theme } = useContext(ThemeContext);
 
  // Check if data is still loading
  if (isLoading) {
    return <Loading />;
  }
  
  // Set theme-based classes
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const borderColor = theme === 'light' ? 'border-gray-300' : 'border-gray-700';
  const linkColor = theme === 'light' ? 'text-blue-500 hover:text-blue-700' : 'text-blue-300 hover:text-blue-500';

  return (
    <div className='flex'>
     {displaysidebar &&  <Sidebar/>}
    <div className={`p-4 ${bgColor} ${textColor}`}>
      <h1 className={`text-2xl font-bold mb-4 ${textColor}`}>Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
  {products.map((product, index) => (
    <div 
      key={product.id} 
      className={`border border-gray-200 rounded-lg overflow-hidden shadow-lg relative transform transition duration-300 hover:scale-105 ${borderColor} ${bgColor}`}
    >
      <Link to={`/product/${product.id}`} className={`block ${linkColor}`}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-64 object-cover transition-opacity duration-200 hover:opacity-90"
        />
        </Link>
        <h3 className={`text-lg font-semibold p-2 ${textColor} truncate`}>{product.title}</h3>
        <p className={`p-2 ${textColor}`}>${product.price}</p>
      
      <RatingDisplay rate={product.rating.rate}/>
      <FaHeart 
        onClick={() => { handleLike(index); }} 
        className={`${liked[index] ? "text-red-600" : "text-gray-400"} cursor-pointer text-xl absolute bottom-3 right-3`}
      />
    </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Products;
