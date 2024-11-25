import React, { useState } from 'react';

const DiscountCodeInput = ({ cartTotal, setTotalPrice }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');

  const applyDiscount = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discountCode, cartTotal }),
      });
      const data = await response.json();
      if (response.ok) {
        setTotalPrice(data.discountedTotal);
        setMessage('Discount applied successfully!');
      } else {
        setMessage(data.message || 'Invalid discount code.');
      }
    } catch (error) {
      setMessage('Error applying discount.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter discount code"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
      />
      <button onClick={applyDiscount}>Apply</button>
      <p>{message}</p>
    </div>
  );
};

export default DiscountCodeInput;
