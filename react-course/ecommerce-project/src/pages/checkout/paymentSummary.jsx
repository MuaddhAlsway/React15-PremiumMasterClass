import { formatMoney } from '../../utils/money';

function PaymentSummary({ totals }) {
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

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
    </div>
  )
}

export default PaymentSummary