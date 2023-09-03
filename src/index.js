import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from 'globalStyle';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" />
    <GlobalStyle />
  </React.StrictMode>
);
