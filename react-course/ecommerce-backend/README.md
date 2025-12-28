# E-Commerce Backend API

A RESTful API backend for the e-commerce React application, built with Express.js and Sequelize ORM. This backend provides complete functionality for product management, shopping cart operations, order processing, and delivery options.

## Features

- **Product Management**: CRUD operations for products with images
- **Shopping Cart**: Add, update, remove items with quantity management
- **Order Processing**: Complete order creation and history tracking
- **Delivery Options**: Multiple shipping methods with pricing
- **Payment Summary**: Real-time cart totals with tax calculation
- **Database Management**: SQLite with Sequelize ORM
- **CORS Support**: Cross-origin requests enabled
- **Static File Serving**: Product images and frontend assets

## Tech Stack

- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **SQLite** - Database (with SQL.js for browser compatibility)
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development server with auto-restart
- **ESLint** - Code linting and formatting

## Project Structure

```
├── models/
│   ├── index.js           # Database connection and model associations
│   ├── Product.js         # Product model definition
│   ├── CartItem.js        # Cart item model definition
│   ├── Order.js           # Order model definition
│   └── DeliveryOption.js  # Delivery option model definition
├── routes/
│   ├── products.js        # Product CRUD endpoints
│   ├── cartItems.js       # Cart management endpoints
│   ├── orders.js          # Order processing endpoints
│   ├── deliveryOptions.js # Delivery options endpoints
│   ├── paymentSummary.js  # Payment calculation endpoints
│   └── reset.js           # Database reset endpoints
├── defaultData/
│   ├── defaultProducts.js    # Sample product data
│   ├── defaultCart.js        # Sample cart items
│   ├── defaultOrders.js      # Sample order history
│   └── defaultDeliveryOptions.js # Shipping options
├── images/                # Product images and assets
├── server.js             # Main server configuration
└── database.sqlite       # SQLite database file
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart Items
- `GET /api/cart-items` - Get all cart items
- `POST /api/cart-items` - Add item to cart
- `PUT /api/cart-items/:id` - Update cart item quantity
- `DELETE /api/cart-items/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get order history
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order (processes entire cart)

### Delivery Options
- `GET /api/delivery-options` - Get available shipping methods

### Payment Summary
- `GET /api/payment-summary` - Get cart totals and tax calculation

### Utility
- `POST /api/reset` - Reset database to default state

## Database Models

### Product
```javascript
{
  id: String (Primary Key)
  image: String (Image URL)
  name: String
  rating: Object { stars: Number, count: Number }
  priceCents: Integer
  keywords: Array of Strings
}
```

### CartItem
```javascript
{
  id: Integer (Auto-increment Primary Key)
  productId: String (Foreign Key)
  quantity: Integer
  deliveryOptionId: String (Foreign Key)
}
```

### Order
```javascript
{
  id: String (Primary Key)
  orderTimeMs: BigInteger (Timestamp)
  totalCostCents: Integer
  products: Array of Objects {
    productId: String
    quantity: Integer
    estimatedDeliveryTimeMs: BigInteger
  }
}
```

### DeliveryOption
```javascript
{
  id: String (Primary Key)
  deliveryDays: Integer
  priceCents: Integer
}
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Navigate to the backend directory**
   ```bash
   cd react-course/ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000`

### Production Deployment

```bash
npm start
```

## Development Scripts

- `npm run dev` - Start development server with nodemon (auto-restart)
- `npm start` - Start production server
- `npm run zip` - Create deployment zip file
- `npm test` - Run tests (placeholder)

## Database Initialization

The database is automatically initialized with sample data on first run:
- **Products**: Various e-commerce items with images and ratings
- **Delivery Options**: Standard, Express, and Overnight shipping
- **Cart Items**: Sample items in cart
- **Orders**: Sample order history

To reset the database to default state, send a POST request to `/api/reset`.

## Environment Configuration

The server runs on port 3000 by default. You can override this with the `PORT` environment variable:

```bash
PORT=8000 npm start
```

## Static File Serving

- Product images are served from `/images/` directory
- Frontend build files are served from `/dist/` directory (for production)

## Error Handling

The API includes comprehensive error handling:
- 400 Bad Request for invalid data
- 404 Not Found for missing resources
- 500 Internal Server Error for server issues

## CORS Configuration

CORS is enabled for all origins in development. For production, configure specific origins in the CORS middleware.

## Video Tutorials
**Part 1 - Create the Backend:** https://youtu.be/vBprybSmJs8

## Troubleshooting
If you run into issues, see the [troubleshooting steps](troubleshooting.md).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

This project is part of a React course and is for educational purposes.
