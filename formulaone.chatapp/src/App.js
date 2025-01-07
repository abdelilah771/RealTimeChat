import React, { useState } from "react";
import Login from "./components/Login";
import WaitingRoom from "./components/WaitingRoom";
import ChatRoom from "./components/ChatRoom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // Firebase user state
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    if (!username || !chatroom) {
      console.error("Username and chatroom are required.");
      return;
    }

    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5276/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveSpecificMessage", (username, message) => {
        setMessages((prevMessages) => [...prevMessages, { username, message }]);
      });

      await connection.start();
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });

      setConnection(connection);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const sendMessage = async (message) => {
    if (conn) {
      try {
        await conn.invoke("SendMessage", message);
      } catch (error) {
        console.error("SendMessage error:", error);
      }
    }
  };

  return (
    <main className="app">
      {!user ? (
        <section className="login-section">
          <header>
            <h1>Welcome to Modern Chat</h1>
            <p>Please log in to continue</p>
          </header>
          <Login setUser={setUser} />
        </section>
      ) : !conn ? (
        <section className="waiting-room-section">
          <header>
            <h2>Waiting Room</h2>
            <p>Join a chatroom to get started</p>
          </header>
          <WaitingRoom joinChatRoom={joinChatRoom} />
        </section>
      ) : (
        <section className="chat-room-section">
          <header>
            <h2>Chat Room</h2>
            <p>Chat with others in real time</p>
          </header>
          <ChatRoom messages={messages} sendMessage={sendMessage} />
        </section>
      )}
      <footer className="app-footer">
        <p>&copy; 2025 Modern Chat. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default App;
