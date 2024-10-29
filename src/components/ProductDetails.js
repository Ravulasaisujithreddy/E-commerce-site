// src/components/ProductDetails.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useCart from '../hooks/useCart';
import { toast } from 'react-toastify';
import { ThemeContext } from '../App';
import Loading from './Loading';
import RatingDisplay from './Ratings';

function ProductDetails() {
  const { id } = useParams();
  const { updateCart } = useCart();
  const { data: product ,isLoading} = useFetch(`https://fakestoreapi.com/products/${id}`, [id]);
  const { theme } = useContext(ThemeContext);
  
  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    updateCart(product);
    toast.success('Product added to cart!', {
      autoClose: 1000 // Close after 1 second
    });
  };

  // Set theme-based classes
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const descriptionColor = theme === 'light' ? 'text-gray-700' : 'text-gray-300';
  const buttonColor = theme === 'light' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-700 hover:bg-blue-600';
  
  return (
    <div className={`flex p-4 ${bgColor} ${textColor}`}>
      
      {isLoading ? <Loading/> :<div className="w-1/4">
        <img className="w-full h-[75vh] object-cover" src={product.image} alt={product.title} />
      </div>}

      <div className="w-1/2 pl-4">
        <h2 className={`text-2xl font-bold mt-2 ${textColor}`}>{product.title}</h2>
        <p className={`mt-1 ${descriptionColor}`}>{product.description}</p>
        <h3 className={`text-xl font-semibold mt-2 ${textColor}`}>${product.price}</h3>
        {console.log(product)}
        {product.rating && (
          <div className='items-center gap-4'>
            <RatingDisplay rate={product.rating.rate} />
            <p>{product.rating.count} Reviews</p>
          </div>
        )}
        <button 
          onClick={handleAddToCart} 
          className={`mt-4 text-white py-2 px-4 rounded ${buttonColor}`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
