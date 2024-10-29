// src/components/Cart.js
import React, { useEffect, useState, useContext } from 'react'; // Import useState and useContext
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { ThemeContext } from '../App';
import { FaTrash } from 'react-icons/fa'

function Cart() {
  // Initialize state for quantities
  const { cart, handleDecrease, handleDelete, handleIncrease } = useCart();
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const val = cart.reduce((total, current) => {
      return total + (current.price * current.quantity);
    }, 0);
    setTotal(val);
  }, [cart]);

  const { theme } = useContext(ThemeContext);

  // Set theme-based classes
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const borderColor = theme === 'light' ? 'border-gray-300' : 'border-gray-600';
  const buttonColor = theme === 'light' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-700 hover:bg-blue-600';

  return (
    <div className={`p-6 rounded-lg shadow-md ${bgColor}`}>
  <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Your Cart</h2>
  
  {cart.length === 0 ? (
    <p className={`${textColor} text-center`}>Your cart is empty.</p>
  ) : (
    <div>
      {cart.map((item, index) => (
        <div 
          key={index} 
          className={`border-b py-3 mb-4 flex items-center ${borderColor}`}
        >
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-16 h-16 object-cover mr-4 rounded-md"
          />
          <div className="flex flex-col">
            <h3 className={`font-semibold ${textColor}`}>{item.title}</h3>
            <p className={`${textColor} text-sm`}>${item.price}</p>
          </div>

          <div className="flex items-center ml-auto space-x-4">
            <div 
              className="flex items-center space-x-2 p-1 rounded opacity-100 transition-opacity hover:opacity-70"
            >
              <button 
              onClick={() => handleDecrease(index)} 
              className={`px-3 py-1 rounded-lg text-black bg-gray-400 hover:bg-gray-200 transition`}
            >
              -
            </button>
            <span className="mx-2 font-semibold">{item.quantity}</span>
            <button 
              onClick={() => handleIncrease(index)} 
              className={`px-3 py-1 rounded-lg text-black bg-gray-400 hover:bg-gray-200 transition`}
            >
              +
            </button>
            </div>
            <span className={`font-semibold mx-2 ${textColor}`}>
              ${(item.quantity * item.price).toFixed(2)}
            </span>
            <button 
              onClick={() => handleDelete(index)} 
              className="text-red-500 hover:text-red-700 transition ml-4"
              aria-label="Delete Item"
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  <div className="flex justify-between items-center mt-6">
    <div className={`font-semibold ${textColor}`}>
      Cart Total: <span className="font-bold">${total.toFixed(2)}</span>
    </div>
  </div>

  <Link 
    to="/checkout" 
    className={`text-white ${buttonColor} hover:bg-blue-700 px-5 py-3 mt-4 inline-block text-center rounded transition`}
  >
    Proceed to Checkout
  </Link>
</div>

  );
}

export default Cart;
