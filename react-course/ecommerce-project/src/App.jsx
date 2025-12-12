import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { CheckoutPage } from './pages/checkout/Checkout';
import Orders from './pages/Orders';
import Tracking from './pages/tracking';
import { useState, useEffect} from 'react'
import axios from "axios";

function App() {
    const [cart, setCart] = useState([]);

useEffect(() => {
  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }
  
  fetchCart()
}, [])
       
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<Orders cart={cart} />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  );
}

export default App;
