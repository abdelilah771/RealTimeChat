import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import WaitingRoom from './components/WaitingRoom';
import ChatRoom from './components/ChatRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
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
    try {
      if (conn) {
        await conn.invoke("SendMessage", message);
      }
    } catch (error) {
      console.error("SendMessage error:", error);
    }
  };

  return (
    <div className="app">
      {!conn ? (
        <Container className="waiting-room-container">
          <Row>
            <Col className="text-center">
              <h1 className="welcome-header">Welcome to RealTime Chat 🚀</h1>
              <p>Connect and chat in real-time with your friends!</p>
              <WaitingRoom joinChatRoom={joinChatRoom} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="chat-room-container">
          <ChatRoom messages={messages} sendMessage={sendMessage} />
        </Container>
      )}
    </div>
  );
}

export default App;
