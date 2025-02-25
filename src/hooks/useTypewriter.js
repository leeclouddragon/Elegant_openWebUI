import React from 'react';

function TypewriterEffect({ text }) {
  // 不再需要打字效果，直接显示文本
  // 因为文本已经通过流式API一个字一个字地更新了
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

export default TypewriterEffect; 