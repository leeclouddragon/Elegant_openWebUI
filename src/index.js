import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/common/main.css';
import './styles/layout/nav.css';
import './styles/chat/chat.css';
import './styles/layout/toolbar.css';
import './styles/chat/input.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
