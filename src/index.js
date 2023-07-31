import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeContext from './context/ThemeContext';

import './index.css';
import './styles/utils.css';
import './styles/common.css';
import WebContext from './context/WebContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ThemeContext>
      <WebContext>
        <App />
      </WebContext>
    </ThemeContext>
  // </React.StrictMode>
);