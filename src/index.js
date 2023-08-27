import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeContext from './context/ThemeContext';

import './index.css';
import './styles/utils.css';
import './styles/common.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeContext>
    <App />
  </ThemeContext>
  // </React.StrictMode>
);