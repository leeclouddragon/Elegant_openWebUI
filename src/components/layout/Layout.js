import React from 'react';
import { useChat } from '../../context/ChatContext';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Toolbar from './Toolbar';
import ChatArea from '../chat/ChatArea';
import InputSection from '../chat/InputSection';

function Layout() {
  const { isChatActive } = useChat();

  return (
    <div className="app">
      {/* 移除这些装饰性边角 
      <div className="renaissance-corner renaissance-corner-tl"></div>
      <div className="renaissance-corner renaissance-corner-tr"></div>
      <div className="renaissance-corner renaissance-corner-bl"></div>
      <div className="renaissance-corner renaissance-corner-br"></div>
      */}
      
      <Navbar />
      <div className={`main-content ${isChatActive ? 'chat-active' : ''}`}>
        {isChatActive && <ChatArea />}
        <div className="content-wrapper">
          {!isChatActive && <Welcome />}
          <InputSection />
          {!isChatActive && <Toolbar />}
        </div>
      </div>
    </div>
  );
}

export default Layout; 