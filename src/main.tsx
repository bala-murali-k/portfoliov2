import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyleProvider } from '@context/global/style-context';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/portfoliov2'>
      <StyleProvider>
        <App />
      </StyleProvider>
    </BrowserRouter>
  </React.StrictMode>
);
