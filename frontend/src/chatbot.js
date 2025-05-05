import React, { useState } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessageToBot = async (message) => {
  try {
    const response = await fetch('http://localhost:8000/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log(data.reply);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};



  return (
    <div>
      <h1>Unispace Chatbot</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something..."
      />
      <button onClick={sendMessage}>Send</button>
      <p>Bot: {response}</p>
    </div>
  );
}

export default Chatbot;
