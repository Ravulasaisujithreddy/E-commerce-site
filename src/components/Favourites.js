import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

function Favourites({ favourites }) {
  const { theme } = useContext(ThemeContext);

  // Define classes based on the theme
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textColor = theme === 'light' ? 'text-gray-700' : 'text-gray-200';
  const borderColor = theme === 'light' ? 'border-gray-300' : 'border-gray-600';

  if (!favourites.length) {
    return (
      <div className={`flex justify-center items-center h-[100vh] ${bgColor} ${textColor}`}>
        <p className="text-xl font-medium text-center p-4">
          Currently no favorites. Add some from the{' '}
          <Link to="/" className="text-blue-500 hover:underline">home page</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className={`p-6 ${bgColor} ${textColor} min-h-[100vh]`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favourites.map((product) => (
          <div key={product.id} className={`border rounded-lg overflow-hidden shadow-lg ${borderColor}`}>
            <Link to={`/product/${product.id}`} className="block">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <h3 className={`text-lg font-semibold p-2 ${textColor}`}>{product.title}</h3>
              <p className={`p-2 ${textColor}`}>${product.price}</p>
            </Link>
          </div>
        ))}
      </div> 
    </div>
  );
}

export default Favourites;
