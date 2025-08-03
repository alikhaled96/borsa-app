# 📈 NASDAQ Stock Market App

A modern, responsive React web application for exploring and searching stocks listed on the NASDAQ exchange. Built with TypeScript, Vite, and React Query for optimal performance and user experience.

## ✨ Features

- **Splash Screen**: Beautiful animated splash screen with NASDAQ branding
- **Stock Exploration**: Browse all NASDAQ stocks with infinite scroll
- **Real-time Search**: Debounced search functionality for stocks by ticker or company name
- **Responsive Design**: Mobile-first design that works on all devices
- **API Caching**: Intelligent caching to reduce redundant API calls
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Unit Tests**: Full test coverage for components and functionality

## 🚀 Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Query (TanStack Query)** - Server state management and caching
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vitest** - Unit testing framework
- **Testing Library** - Component testing utilities

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Polygon.io API key (free tier available)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stock-market-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Polygon.io API key:
   ```
   VITE_POLYGON_API_KEY=your_polygon_api_key_here
   ```

4. **Get a Polygon.io API key**
   - Visit [Polygon.io](https://polygon.io/)
   - Sign up for a free account
   - Copy your API key from the dashboard
   - Paste it in your `.env` file

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run preview
```

### Running Tests
```bash
npm run test
```

### Running Tests in Watch Mode
```bash
npm run test:watch
```

## 📱 Features in Detail

### Splash Screen
- Animated NASDAQ logo with stock chart visualization
- Developer information display
- Smooth transition to main application

### Explore Screen
- **Stock Grid**: Responsive grid layout showing stock cards
- **Infinite Scroll**: Load more stocks as you scroll
- **Search Functionality**: Real-time search with debouncing
- **Stock Cards**: Detailed information including:
  - Ticker symbol and company name
  - Market cap (formatted)
  - Active/Inactive status
  - Exchange information
  - Company description
  - Company logo (when available)

### Search Features
- **Debounced Search**: 300ms delay to prevent excessive API calls
- **Real-time Results**: Search results update as you type
- **Clear Search**: Easy way to clear search and return to all stocks
- **Search Results Count**: Shows number of results found

### Error Handling
- **API Errors**: User-friendly error messages for various API issues
- **Rate Limiting**: Handles Polygon.io rate limits gracefully
- **Network Errors**: Retry functionality for failed requests
- **Loading States**: Clear loading indicators for better UX

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SplashScreen.tsx
│   ├── SearchBar.tsx
│   ├── StockCard.tsx
│   └── __tests__/      # Component tests
├── pages/              # Page components
│   ├── ExploreScreen.tsx
│   └── __tests__/      # Page tests
├── hooks/              # Custom React hooks
│   └── useStocks.ts
├── services/           # API services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
├── contexts/           # React contexts
└── test/               # Test setup
    └── setup.ts
```

## 🔧 Configuration

### Environment Variables
- `VITE_POLYGON_API_KEY`: Your Polygon.io API key (required)

### API Configuration
- Base URL: `https://api.polygon.io`
- Endpoint: `/v3/reference/tickers`
- Cache Duration: 5 minutes
- Request Timeout: 10 seconds

## 🧪 Testing

The application includes comprehensive unit tests:

- **Component Tests**: All components are tested for rendering and interactions
- **Hook Tests**: Custom hooks are tested for state management
- **API Tests**: API service functions are tested for error handling

Run tests with:
```bash
npm run test
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

### Other Platforms
The application can be deployed to any static hosting platform that supports React applications.

## 🔒 Security

- API keys are stored in environment variables
- No sensitive data is exposed in client-side code
- CORS is properly configured for API requests

## 📈 Performance

- **Code Splitting**: Automatic code splitting with Vite
- **Lazy Loading**: Components are loaded on demand
- **Caching**: API responses are cached to reduce requests
- **Optimized Images**: Company logos are optimized for web
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm run test`
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Polygon.io](https://polygon.io/) for providing the stock market data API
- [React Query](https://tanstack.com/query) for excellent server state management
- [Vite](https://vitejs.dev/) for the fast build tool
- [Testing Library](https://testing-library.com/) for testing utilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

**Developed by Ali Khaled** - Full Stack Developer
