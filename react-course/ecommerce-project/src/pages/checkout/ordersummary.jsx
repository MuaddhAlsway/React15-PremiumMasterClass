import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import DeliveryOption from './deliveryOption';
export default function OrderSummary({cart, deliveryOptions, selectedDeliveryOptions, handleDeliveryOptionChange}) {
  return (
    <div>
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
        
                              <DeliveryOption 
                                cartItem={cartItem}
                                deliveryOptions={deliveryOptions}
                                selectedDeliveryOptions={selectedDeliveryOptions}
                                handleDeliveryOptionChange={handleDeliveryOptionChange}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
    </div>
  )
}
