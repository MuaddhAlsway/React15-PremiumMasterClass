import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

function DeliveryOption({ cartItem, deliveryOptions, selectedDeliveryOptions, handleDeliveryOptionChange }) {
  return (
    <div>
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
  )
}

export default DeliveryOption