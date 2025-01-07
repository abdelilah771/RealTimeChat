import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <Form className="send-message-form" onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="primary" disabled={!message.trim()}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
