# E-Commerce React Application

A full-stack e-commerce application built with React, Vite, and Express.js. This project demonstrates modern web development practices with a complete shopping cart, checkout process, and order management system.

## Features

- **Product Catalog**: Browse and view product details
- **Shopping Cart**: Add, remove, and modify items in cart
- **Checkout Process**: Complete order placement with delivery options
- **Order Management**: View order history and tracking
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Dynamic cart and order totals

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Day.js** - Date manipulation library

### Backend
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **SQLite** - Database (with SQL.js)
- **CORS** - Cross-origin resource sharing

## Project Structure

```
src/
├── Components/
│   ├── Header.jsx          # Main navigation header
│   └── header.css
├── pages/
│   ├── Home/
│   │   ├── HomePage.jsx    # Main product listing page
│   │   ├── Product-Grid.jsx # Product grid component
│   │   └── product.jsx     # Individual product component
│   ├── checkout/
│   │   ├── Checkout.jsx    # Main checkout page
│   │   ├── checkoutHeader.jsx
│   │   ├── ordersummary.jsx
│   │   ├── paymentSummary.jsx
│   │   └── deliveryOption.jsx
│   ├── Orders.jsx          # Order history page
│   └── tracking.jsx        # Order tracking page
├── utils/
│   └── money.js           # Currency formatting utilities
├── App.jsx                # Main app component with routing
└── main.jsx              # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd react-course/ecommerce-project
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../ecommerce-backend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd react-course/ecommerce-backend
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd react-course/ecommerce-project
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/products` - Get all products
- `GET /api/cart-items` - Get cart items
- `POST /api/cart-items` - Add item to cart
- `PUT /api/cart-items/:id` - Update cart item
- `DELETE /api/cart-items/:id` - Remove cart item
- `GET /api/delivery-options` - Get delivery options
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get order history
- `GET /api/payment-summary` - Get payment summary

## Key Components

### HomePage
Main landing page displaying the product grid with search and filtering capabilities.

### Checkout
Multi-step checkout process including:
- Order summary with item details
- Delivery option selection
- Payment summary with tax calculation
- Order placement

### Orders
Order history page showing past purchases with order details and tracking information.

### Cart Management
Real-time cart updates with quantity modifications and item removal.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database

The application uses SQLite with Sequelize ORM. The database is automatically initialized with sample data on first run, including:
- Sample products
- Delivery options
- Default cart items
- Sample orders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is part of a React course and is for educational purposes.
