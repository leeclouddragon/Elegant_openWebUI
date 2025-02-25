import React, { createContext, useState, useContext, useEffect } from 'react';

// 创建聊天上下文
const ChatContext = createContext();

// 自定义钩子，方便组件使用上下文
export const useChat = () => useContext(ChatContext);

// 上下文提供者组件
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);

  // 添加消息到聊天
  const addMessage = (text, role) => {
    // 确保文本不为undefined或null
    const safeText = text || '';
    
    // 检查文本是否有效
    if (role === 'assistant' && (!safeText || safeText.length < 2)) {
      console.warn('收到无效的助手消息:', safeText);
      setMessages(prevMessages => [...prevMessages, { 
        text: '抱歉，我的回复出现了问题。请再试一次。', 
        role: 'assistant' 
      }]);
      return;
    }
    
    setMessages(prevMessages => [...prevMessages, { text: safeText, role }]);
    if (!isChatActive) {
      setIsChatActive(true);
    }
  };

  // 发送消息到API
  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    // 添加用户消息
    addMessage(text, 'user');
    
    // 创建一个加载状态的ID
    const loadingId = Date.now().toString();
    
    try {
      // 添加临时加载消息
      setMessages(prevMessages => [
        ...prevMessages, 
        { id: loadingId, text: '', role: 'loading' } // 移除文本，使用纯动画
      ]);
      
      const response = await fetch('/api/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "ep-20250213141038-xs76z",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant."
            },
            {
              role: "user",
              content: text
            }
          ]
        })
      });
      
      const data = await response.json();
      console.log('API响应:', data);
      
      // 移除加载消息
      setMessages(prevMessages => prevMessages.filter(msg => msg.role !== 'loading'));
      
      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        const assistantMessage = data.choices[0].message.content;
        console.log('助手回复:', assistantMessage);
        
        // 添加助手消息
        addMessage(assistantMessage, 'assistant');
      } else {
        throw new Error('无效的响应格式');
      }
    } catch (error) {
      console.error('错误:', error);
      
      // 移除加载消息
      setMessages(prevMessages => prevMessages.filter(msg => msg.role !== 'loading'));
      
      addMessage('抱歉，处理您的请求时出现了错误。', 'error');
    }
  };

  // 重置聊天
  const resetChat = () => {
    setMessages([]);
    setIsChatActive(false);
  };

  // 提供的上下文值
  const value = {
    messages,
    isChatActive,
    addMessage,
    sendMessage,
    resetChat
  };

  useEffect(() => {
    // 当有消息时，立即设置聊天为活跃状态
    if (messages.length > 0 && !isChatActive) {
      console.log('激活聊天状态'); // 添加日志
      setIsChatActive(true);
      
      // 添加类名到body元素，确保CSS选择器能匹配
      document.body.classList.add('has-chat');
    }
  }, [messages, isChatActive]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext; 