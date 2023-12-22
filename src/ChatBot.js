// MockChatbot.js
import React, { useState, useEffect } from 'react';
import './ChatBot.css';

const MockChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userData, setUserData] = useState({ name: '', mobile: '', date: '', time: '' });
  const [showChat, setShowChat] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const sendMessage = (text, isUser = true) => {
    setMessages([...messages, { text, isUser }]);
  };

  const startConversation = () => {
    sendMessage("Welcome to our restaurant reservation service!");
    askForName();
  };

  const askForName = () => {
    sendMessage("May I know your name?");
  };

  const askForMobile = () => {
    sendMessage('Great! Please provide your mobile number.');
  };

  const showCalendar = () => {
    sendMessage('Awesome! When would you like to reserve a table?');
  };

  const showTimeOptions = () => {
    sendMessage('Excellent! What time works best for you?');
  };

  const confirmReservation = () => {
    console.log(userData);
    const confirmationMessage = ` Table has been reserved for ${userData.name} on ${userData.date} at ${userData.time}.`;
    sendMessage(confirmationMessage, false);
  };

  const processUserInput = () => {
    if (!userData.name) {
      setUserData({ ...userData, name: inputText });
      askForMobile();
    } else if (!userData.mobile) {
      setUserData({ ...userData, mobile: inputText });
      showCalendar();
    } else if (!userData.date) {
      setUserData({ ...userData, date: inputText });
      showTimeOptions();
    } else if (!userData.time) {
      setUserData({ ...userData, time: inputText });
      confirmReservation();
    } else {
      sendMessage("I'm sorry, I didn't understand that. Can you please provide more information?");
    }
  };

  const handleUserInput = () => {
    if (inputText.trim() === '') {
      return;
    }

    setMessages([...messages, { text: inputText, isUser: true }]);
    setInputText('');

    processUserInput();
  };

  // Initialize the conversation
  useEffect(() => {
    if (!hasStarted) {
      startConversation();
      setHasStarted(true);
    }
  }, [hasStarted]); // Run only once when hasStarted changes

  return (
    <div className={`mock-chat-container ${showChat ? 'open' : ''}`}>
      <div className="mock-chat-header" onClick={() => setShowChat(!showChat)}>
        Reserve Your Table
      </div>
      {showChat && (
        <div className="mock-chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message-container ${message.isUser ? 'user-message' : 'bot-message'}`}>
              {message.text}
            </div>
          ))}
        </div>
      )}
      {showChat && (
        <div className="mock-chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleUserInput();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MockChatbot;
