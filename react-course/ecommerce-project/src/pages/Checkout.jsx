import { formatMoney } from '../utils/money';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({cart = []}) {
  // Calculate totals
  const itemsTotal = cart.reduce((total, item) => total + (item.priceCents * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const shippingCost = totalItems > 0 ? 499 : 0; // $4.99 in cents, free if no items
  const subtotal = itemsTotal + shippingCost;
  const tax = Math.round(subtotal * 0.1);
  const orderTotal = subtotal + tax;

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
              href="/">{cart.reduce((total, item) => total + item.quantity, 0)} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.length === 0 ? (
              <div className="empty-cart-message">
                <p>Your cart is empty. <a href="/">Continue shopping</a></p>
              </div>
            ) : (
              cart.map((cartItem) => (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: Tuesday, June 21
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={cartItem.product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                       {formatMoney(cartItem.product.priceCents)}
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
                      <div className="delivery-option">
                        <input type="radio" defaultChecked
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.productId}`} />
                        <div>
                          <div className="delivery-option-date">
                            Tuesday, June 21
                          </div>
                          <div className="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input type="radio"
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.productId}`} />
                        <div>
                          <div className="delivery-option-date">
                            Wednesday, June 15
                          </div>
                          <div className="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input type="radio"
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.productId}`} />
                        <div>
                          <div className="delivery-option-date">
                            Monday, June 13
                          </div>
                          <div className="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({totalItems}):</div>
              <div className="payment-summary-money">${(itemsTotal / 100).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">${(shippingCost / 100).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${(subtotal / 100).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${(tax / 100).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${(orderTotal / 100).toFixed(2)}</div>
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