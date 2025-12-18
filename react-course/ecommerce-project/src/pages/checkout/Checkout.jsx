
import '../checkout-header.css';
import './CheckoutPage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import OrderSummary from './ordersummary';
import CheckoutHeader from './checkoutHeader';
import PaymentSummary from './paymentSummary';
export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Generate default delivery options if API fails
  const generateDeliveryOptions = () => {
    const today = dayjs();
    return [
      {
        id: 'free',
        name: 'FREE Shipping',
        priceCents: 0,
        estimatedDeliveryTimeMs: today.add(7, 'day').valueOf()
      },
      {
        id: 'standard',
        name: 'Standard Shipping',
        priceCents: 499,
        estimatedDeliveryTimeMs: today.add(3, 'day').valueOf()
      },
      {
        id: 'express',
        name: 'Express Shipping',
        priceCents: 999,
        estimatedDeliveryTimeMs: today.add(1, 'day').valueOf()
      }
    ];
  };

  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      try {
        const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
        setDeliveryOptions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching delivery options:', error);
        // Use generated options as fallback
        setDeliveryOptions(generateDeliveryOptions());
        setIsLoading(false);
      }
    };
    
    fetchDeliveryOptions();
  }, []);

  // Initialize selected delivery options with first option for each item
  useEffect(() => {
    if (deliveryOptions.length > 0 && cart.length > 0) {
      const initialSelections = {};
      cart.forEach(item => {
        if (!selectedDeliveryOptions[item.productId]) {
          initialSelections[item.productId] = deliveryOptions[0].id;
        }
      });
      setSelectedDeliveryOptions(prev => ({ ...prev, ...initialSelections }));
    }
  }, [deliveryOptions, cart]);

  const handleDeliveryOptionChange = (productId, optionId) => {
    setSelectedDeliveryOptions(prev => ({
      ...prev,
      [productId]: optionId
    }));
  };

  // Calculate totals with dynamic shipping
  const calculateTotals = () => {
    // Safely calculate items total with fallbacks
    const itemsTotal = cart.reduce((total, item) => {
      const price = item.product?.priceCents || item.priceCents || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
    
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    
    // Calculate shipping cost based on selected options
    let totalShippingCost = 0;
    if (deliveryOptions.length > 0) {
      cart.forEach(item => {
        const selectedOptionId = selectedDeliveryOptions[item.productId] || deliveryOptions[0]?.id;
        const selectedOption = deliveryOptions.find(opt => opt.id === selectedOptionId);
        if (selectedOption && selectedOption.priceCents) {
          totalShippingCost += selectedOption.priceCents;
        }
      });
    } else {
      // Fallback shipping cost if no delivery options loaded
      totalShippingCost = totalItems > 0 ? 499 : 0;
    }

    const subtotal = itemsTotal + totalShippingCost;
    const tax = Math.round(subtotal * 0.1);
    const orderTotal = subtotal + tax;

    return {
      itemsTotal: itemsTotal || 0,
      totalItems: totalItems || 0,
      shippingCost: totalShippingCost || 0,
      subtotal: subtotal || 0,
      tax: tax || 0,
      orderTotal: orderTotal || 0
    };
  };

  const totals = calculateTotals();

  // Debug logging
  console.log('Cart:', cart);
  console.log('Cart length:', cart.length);
  console.log('Total items:', totals.totalItems);
  console.log('Delivery Options:', deliveryOptions);
  console.log('Selected Delivery Options:', selectedDeliveryOptions);
  console.log('Calculated Totals:', totals);

  // Show loading state while data is being fetched
  if (isLoading && cart.length === 0) {
    const loadingTotals = { totalItems: 0 };
    return (
      <>
        <title>Checkout</title>
        <CheckoutHeader totals={loadingTotals} />
        <div className="checkout-page">
          <div className="page-title">Loading your order...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader totals={totals} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary 
            cart={cart}
            deliveryOptions={deliveryOptions}
            selectedDeliveryOptions={selectedDeliveryOptions}
            handleDeliveryOptionChange={handleDeliveryOptionChange}
            loadCart={loadCart}
          />

          <PaymentSummary totals={totals} />
        </div>
      </div>
    </>
  );
}