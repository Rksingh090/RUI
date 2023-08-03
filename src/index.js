import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeContext from './context/ThemeContext';

import './index.css';
import './styles/utils.css';
import './styles/common.css';
import WebContext from './context/WebContext';
import DockerContext from './context/DockerContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeContext>
    <DockerContext>
      <WebContext>
        <App />
      </WebContext>
    </DockerContext>
  </ThemeContext>
  // </React.StrictMode>
);