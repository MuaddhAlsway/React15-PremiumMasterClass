import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useNavigate } from 'react-router';


function PaymentSummary({ totals , loadCart}) {
const navigate = useNavigate()
  const createOrder = async () => {
    try {
      await axios.post('/api/orders')
      await loadCart()
      navigate('/orders')
    } catch (error) {
      console.error('Error creating order:', error)
      // You might want to show an error message to the user here
    }
  }
  return (
    <div>
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

            <button className="place-order-button button-primary" onClick={createOrder}>
              Place your order
            </button>
          </div>
    </div>
  )
}

export default PaymentSummary