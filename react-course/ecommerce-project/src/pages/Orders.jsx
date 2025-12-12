import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../Components/Header';
import './orders.css';
import axios from "axios";

function Orders({cart}) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.title = "Orders";
  }, []);
  
  useEffect(() => {
    axios.get('/api/orders?expand=products') 
    .then((response) => {
      console.log('Orders data:', response.data);
      setOrders(response.data);
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
    });
  }, []); 
  return (
    <div>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.length === 0 ? (
            <div className="empty-orders">
              <p>You haven't placed any orders yet.</p>
              <Link to="/">
                <button className="button-primary">Start Shopping</button>
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{new Date(order.orderTimeMs).toLocaleDateString()}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                {order.products.map((product) => (
                  <div key={product.productId} className="order-details-grid">
                    <div className="product-image-container">
                      <img 
                        src={product.product?.image || 'images/products/placeholder.jpg'} 
                        alt={product.product?.name || 'Product'} 
                      />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {product.product?.name || 'Unknown Product'}
                      </div>
                      <div className="product-delivery-date">
                        Arriving on: {new Date(product.estimatedDeliveryTimeMs).toLocaleDateString()}
                      </div>
                      <div className="product-quantity">Quantity: {product.quantity}</div>
                      <button className="buy-again-button button-primary">
                        <img className="buy-again-icon" src="images/icons/buy-again.png" alt="Buy Again" />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <Link to="/tracking">
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
