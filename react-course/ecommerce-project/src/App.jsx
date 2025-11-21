import { Routes, Route } from 'react-router-dom'; // ✅ fixed
import './App.css';
import HomePage from './pages/HomePage'; // ✅ fix filename
import { CheckoutPage } from './pages/Checkout';

import {Orders} from './pages/Orders'
import {Tracking} from './pages/tracking' 

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path='orders' element={<Orders/>}></Route>
      <Route path='tracking' element={<Tracking/>}></Route>
    </Routes>
  );
}

export default App;
