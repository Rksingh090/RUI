import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeContext from './context/ThemeContext';

import './index.global.css';
import './styles/utils.global.css';
import './styles/common.global.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeContext>
    <App />
  </ThemeContext>
  // </React.StrictMode>
);