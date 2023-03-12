import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";

const ChatRoom = ({ roomId }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io("https://");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("joinRoom", roomId);
      });

      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket, roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit("message", message);
    setMessage("");
  };

  return (
    <Container>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <ChatForm onSubmit={handleSendMessage}>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">Send</button>
        </ChatForm>
      </div>
    </Container>
  );
};

export default ChatRoom;

const Container = styled.div`
  width: 500px;
  height: 700px;
  margin: auto;
  border: 1px solid gray;
  border-radius: 4px;
`;

const ChatForm = styled.form`
  width: 100%;
  height: 50px;
  padding-top: 100px;
`;
