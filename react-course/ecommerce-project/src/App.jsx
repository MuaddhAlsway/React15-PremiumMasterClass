import { Routes, Route } from 'react-router-dom'; // ✅ fixed
import './App.css';
import HomePage from './pages/HomePage'; // ✅ fix filename
import { CheckoutPage } from './pages/Checkout';

import {Orders} from './pages/Orders'


function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path='orders' element={<Orders/>}></Route>
    </Routes>
  );
}

export default App;
