import { formatMoney } from '../utils/money';
import './checkout-header.css';
import './CheckoutPage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export function CheckoutPage({ cart }) {
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
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOptions(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching delivery options:', error);
        // Use generated options as fallback
        setDeliveryOptions(generateDeliveryOptions());
        setIsLoading(false);
      });
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
  console.log('Delivery Options:', deliveryOptions);
  console.log('Selected Delivery Options:', selectedDeliveryOptions);
  console.log('Calculated Totals:', totals);

  // Show loading state while data is being fetched
  if (isLoading && cart.length === 0) {
    return (
      <>
        <title>Checkout</title>
        <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-left-section">
              <a href="/">
                <img className="logo" src="/images/logo.png" alt="Logo" />
                <img className="mobile-logo" src="/images/mobile-logo.png" alt="Mobile Logo" />
              </a>
            </div>
            <div className="checkout-header-middle-section">
              Checkout (Loading...)
            </div>
            <div className="checkout-header-right-section">
              <img src="/images/icons/checkout-lock-icon.png" alt="Secure Checkout" />
            </div>
          </div>
        </div>
        <div className="checkout-page">
          <div className="page-title">Loading your order...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="/images/logo.png" alt="Logo" />
              <img className="mobile-logo" src="/images/mobile-logo.png" alt="Mobile Logo" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
              href="/">{cart.reduce((total, item) => total + (item.quantity || 0), 0)} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" alt="Secure Checkout" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.length === 0 ? (
              <div className="cart-item-container">
                <div className="empty-cart-message">
                  <p>Your cart is empty. <a href="/">Continue shopping</a></p>
                </div>
              </div>
            ) : (
              cart.map((cartItem) => {
                const selectedOptionId = selectedDeliveryOptions[cartItem.productId];
                const selectedOption = deliveryOptions.find(opt => opt.id === selectedOptionId);
                const deliveryDate = selectedOption 
                  ? dayjs(selectedOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')
                  : 'Loading...';

                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date: {deliveryDate}
                    </div>

                    <div className="cart-item-details-grid">
                      <img className="product-image"
                        src={cartItem.product.image} 
                        alt={cartItem.product.name} />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {formatMoney(cartItem.product?.priceCents || cartItem.priceCents || 0)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.length > 0 ? (
                          deliveryOptions.map((option, index) => (
                            <div key={option.id || index} className="delivery-option">
                              <input 
                                type="radio" 
                                checked={selectedDeliveryOptions[cartItem.productId] === option.id}
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                                value={option.id}
                                onChange={() => handleDeliveryOptionChange(cartItem.productId, option.id)}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                </div>
                                <div className="delivery-option-price">
                                  {option.priceCents === 0 ? 'FREE Shipping' : `${formatMoney(option.priceCents)} - Shipping`}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="delivery-option">
                            <input type="radio" defaultChecked
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`} />
                            <div>
                              <div className="delivery-option-date">
                                Loading delivery options...
                              </div>
                              <div className="delivery-option-price">
                                FREE Shipping
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({totals.totalItems}):</div>
              <div className="payment-summary-money">{formatMoney(totals.itemsTotal)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatMoney(totals.shippingCost)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatMoney(totals.subtotal)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMoney(totals.tax)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMoney(totals.orderTotal)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}