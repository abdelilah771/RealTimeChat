import React, { useEffect, useRef } from "react";
import SendMessageForm from "./SendMessageForm";
import "./ChatRoom.css";

const ChatRoom = ({ messages, sendMessage }) => {
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h3>Chat Room</h3>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.username === "You" ? "message-outgoing" : "message-incoming"
            }`}
          >
            <span className="message-username">{msg.username}</span>
            <p className="message-text">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <SendMessageForm sendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
