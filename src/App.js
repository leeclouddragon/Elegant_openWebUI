import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
      <ChatProvider>
        <Layout />
      </ChatProvider>
    </Router>
  );
}

export default App; 