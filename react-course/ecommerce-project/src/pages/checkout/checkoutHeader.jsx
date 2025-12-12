function CheckoutHeader({ totals }) {
  return (
    <div>
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
                      href="/">{totals.totalItems} {totals.totalItems === 1 ? 'item' : 'items'}</a>)
                  </div>
        
                  <div className="checkout-header-right-section">
                    <img src="/images/icons/checkout-lock-icon.png" alt="Secure Checkout" />
                  </div>
                </div>
              </div>
    </div>
  )
}

export default CheckoutHeader