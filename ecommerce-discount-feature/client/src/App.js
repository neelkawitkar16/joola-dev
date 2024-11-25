import React, { useState } from 'react';
import DiscountCodeInput from './components/DiscountCodeInput';

const App = () => {
  const [cartTotal, setCartTotal] = useState(100); // Example cart total
  const [totalPrice, setTotalPrice] = useState(cartTotal);

  return (
    <div>
      <h1>Checkout</h1>
      <p>Original Total: ${cartTotal}</p>
      <p>Discounted Total: ${totalPrice}</p>
      <DiscountCodeInput cartTotal={cartTotal} setTotalPrice={setTotalPrice} />
    </div>
  );
};

export default App;