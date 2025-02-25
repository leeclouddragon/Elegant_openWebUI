import React from 'react';
import { useChat } from '../../context/ChatContext';
import TypewriterEffect from '../../hooks/useTypewriter';

function ChatArea() {
  const { messages } = useChat();

  return (
    <div className={`chat-area ${messages.length > 0 ? 'active' : ''}`}>
      {messages.map((message, index) => {
        if (message.role === 'loading') {
          return (
            <div key={message.id || index} className="message assistant loading">
              <div className="message-content loading-content">
                <div className="loading-indicator">
                  <div className="loading-circle"></div>
                  <div className="loading-circle"></div>
                  <div className="loading-circle"></div>
                </div>
                <span className="loading-text">思考中</span>
              </div>
            </div>
          );
        }
        
        return (
          <div key={message.id || index} className={`message ${message.role}`}>
            {message.role === 'user' ? (
              <div className="message-content">{message.text}</div>
            ) : (
              <div className="message-content">
                <TypewriterEffect text={message.text} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChatArea; 