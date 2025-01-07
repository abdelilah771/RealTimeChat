import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom }) => {
  const [username, setUsername] = useState('');
  const [chatroom, setChatroom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    joinChatRoom(username, chatroom);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Chatroom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter chatroom name"
          value={chatroom}
          onChange={(e) => setChatroom(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary" disabled={!username || !chatroom}>
        Join Chat
      </Button>
    </Form>
  );
};

export default WaitingRoom;
