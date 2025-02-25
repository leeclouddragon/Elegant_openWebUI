import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';

function InputSection() {
  const { isChatActive, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef(null);

  // 添加内联样式确保固定定位
  const inputSectionStyle = isChatActive ? {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '800px',
    zIndex: 1000,
    backgroundColor: 'var(--background-color)',
    padding: '10px',
    borderRadius: 'var(--radius-medium)',
    boxShadow: 'var(--shadow-medium)',
    margin: 0
  } : {};

  // 自动调整高度的函数
  const autoResizeTextarea = (element) => {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
  };

  // 当输入文本变化时调整高度
  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea(textareaRef.current);
    }
  }, [inputText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
      // 重置高度
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    // 支持 Command+Enter 或 Ctrl+Enter 换行
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // 在光标位置插入换行符
      const newText = inputText.substring(0, start) + '\n' + inputText.substring(end);
      setInputText(newText);
      
      // 使用 setTimeout 确保在状态更新后设置光标位置
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-section" style={inputSectionStyle}>
      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          className="input-box"
          placeholder="Discover exceptional leaders in tech innovation..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="input-features">
          <div className="features-left">
            <button className="feature-btn">
              <span>⚲</span> Deep Search
            </button>
            <button className="feature-btn">
              <span>◈</span> Think
            </button>
          </div>
          <div className="features-right">
            <button className="send-button" onClick={handleSubmit}>
              <svg className="paper-plane-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M21.8 2.2L1.6 9.8c-0.2 0.1-0.2 0.4 0 0.5L8.5 13l2.7 8.2c0.1 0.2 0.3 0.2 0.5 0.1l2.5-1.8 5.2 3.4c0.2 0.1 0.5 0 0.6-0.2l4-20c0.1-0.3-0.2-0.6-0.5-0.5z" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"
                />
                <path 
                  d="M21.8 2.2L11.2 13.2" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M11.2 13.2l-2.2 6.5" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="0.6 1.5"
                />
                <path 
                  d="M14.2 19.5l-3-6.3" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputSection; 