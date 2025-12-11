import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import { CheckoutPage } from './pages/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import { useState, useEffect} from 'react'
import axios from "axios";

function App() {
    const [cart, setCart] = useState([]);

useEffect(() => {
axios.get('/api/cart-items')
    
        .then((response) => {
          setCart(response.data)
        })  
     
})
       
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage  cart={cart} />} />
      <Route path="orders" element={<Orders />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  );
}

export default App;
