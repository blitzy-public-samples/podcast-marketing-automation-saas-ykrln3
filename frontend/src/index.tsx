import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css'; // Assuming you have a global CSS file

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// TODO: Configure and implement proper error logging service
// TODO: Set up environment-specific configuration (development, staging, production)
// TODO: Implement service worker for offline capabilities and faster loading
// TODO: Add meta tags for SEO optimization
// TODO: Configure Content Security Policy
// TODO: Implement analytics tracking (e.g., Google Analytics)
// TODO: Ensure proper handling of browser compatibility issues