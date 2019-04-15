import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

function HookerChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("SEND_MESSAGE", { message });
    setMessage("");
  }

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", data => setMessages([...messages, data]));
  });

  return (
    <div>
      <ul>
        {messages.map(message => (
          <li>{message.message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default HookerChat;
