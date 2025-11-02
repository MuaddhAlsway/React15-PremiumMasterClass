// App.js
import './App.css';
import { Chatbot } from 'supersimpledev';
import { useState, useEffect, useRef } from 'react';
import { RobotProfileImage } from './assets/robot.png';
import { userProfileImage } from './assets/user.png';

// Chat Message Component
function ChatMessage({ message, sender }) {
  return (
    <div
      className={
        sender === 'user'
          ? 'chat-message-user'
          : 'chat-message-robot'
      }
    >
      {sender === 'robot' && <img src={RobotProfileImage}className='chat-message-profile' />}
      <div className='chat-message-text'>
        {message}
      </div>
      {sender === 'user' && <img src={userProfileImagS} className='chat-message-profile' />}
    </div>
  );
}

// Chat Messages Container
function ChatMessages({ chatMessages }) {
  const chatMessageRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessageRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className='chat-message-container' ref={chatMessageRef}>
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          key={chatMessage.id}
          message={chatMessage.message}
          sender={chatMessage.sender}
        />
      ))}
    </div>
  );
}

// Chat Input Component
function ChatInput({ chatMessages, setChatMessage }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    if (inputText.trim() === '') return;

    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: 'user', id: crypto.randomUUID() }
    ];
    setChatMessage(newChatMessages);
    setInputText('');

    const response = Chatbot.getResponse(inputText);
    setChatMessage([
      ...newChatMessages,
      { message: response, sender: 'robot', id: crypto.randomUUID() }
    ]);
  }

  return (
    <div className='chat-input-container'>
      <input
        placeholder="Send message to Chatbot"
        size="30"
        value={inputText}
        onChange={saveInputText}
        className='chat-input'
      />
      <button className='send-button' onClick={sendMessage}>Send</button>
    </div>
  );
}

// Main App Component
function App() {
  const [chatMessages, setChatMessage] = useState([
    { message: 'hello chatbot', sender: 'user', id: 'id1' },
    { message: 'Hello! How can I help you?', sender: 'robot', id: 'id2' },
    { message: 'Can you get me today’s date?', sender: 'user', id: 'id3' },
    { message: 'Today is September 27', sender: 'robot', id: 'id4' }
  ]);

  return (
    <div className='app-container'>
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessage={setChatMessage} />
    </div>
  );
}

export default App;
