# E-Commerce Frontend

A modern, responsive React frontend for the E-Commerce Platform built with TypeScript, Tailwind CSS, and React Query.

## Features

- 🛍️ **Product Catalog** - Browse products with filtering and sorting
- 🔐 **Authentication** - User registration, login, and JWT token management
- 🛒 **Shopping Cart** - Add products to cart and manage quantities
- 👤 **User Profile** - View and edit user information
- 📦 **Order Management** - Track order history and status
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly** - Optimized for all device sizes
- ⚡ **Fast Performance** - React Query for efficient data fetching
- 🔒 **Protected Routes** - Role-based access control

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Heroicons** - Icons

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend services running (see main README)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables (optional):
```bash
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_API_URL=http://localhost:8080
```

## Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── ProductCard.tsx # Product display card
│   └── ProtectedRoute.tsx # Auth protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login form
│   ├── Register.tsx    # Registration form
│   ├── Products.tsx    # Product catalog
│   └── ...
├── services/           # API services
│   └── api.ts         # API client and endpoints
├── types/              # TypeScript definitions
│   └── index.ts       # Data models
├── App.tsx            # Main app component
└── index.tsx          # Entry point
```

## API Integration

The frontend connects to the following backend services:

- **API Gateway** (Port 8080) - Main entry point
- **Product Service** - Product catalog and inventory
- **User Service** - Authentication and user management
- **Order Service** - Order processing
- **Payment Service** - Payment processing

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8080` |

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test on different screen sizes
4. Update documentation as needed

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend services are running and CORS is configured
2. **API Connection**: Check if API Gateway is running on port 8080
3. **Build Errors**: Clear node_modules and reinstall dependencies

### Development Tips

- Use React DevTools for debugging
- Check Network tab for API calls
- Use React Query DevTools for data fetching debugging
- Test responsive design with browser dev tools

## License

This project is part of the E-Commerce Platform. 