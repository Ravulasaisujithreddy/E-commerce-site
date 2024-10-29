// src/components/Checkout.js
import React, { useState } from 'react';

function Checkout() {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handlePayment = () => {
    // Fake payment processing
    setTimeout(() => setPaymentSuccessful(true), 2000);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {!paymentSuccessful ? (
        <div className="flex flex-col items-center">
          <p className="mb-2">Processing payment...</p>
          <button 
            onClick={handlePayment} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Confirm Payment
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className="text-green-500 text-xl">Payment Successful!</h3>
        </div>
      )}
    </div>
  );
}

export default Checkout;
