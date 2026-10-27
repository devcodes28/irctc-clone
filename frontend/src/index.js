import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Application Entry Point
 * Demonstrates:
 * - React 18 createRoot API (PPT Slide 24-28)
 * - React.StrictMode for development warnings
 * - React Bootstrap integrated via CSS import
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
