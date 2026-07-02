import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";
import ChatHeader from "../components/ChatHeader";
import ConnectionStatus from "../components/ConnectionStatus";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import "../styles/Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    // If somehow there is no username, send the user back to login
    if (!username) {
      navigate("/login");
      return;
    }

    // Connect the socket only when the Chat page mounts
    socket.connect();

    const handleConnect = () => setConnectionStatus("Connected");
    const handleDisconnect = () => setConnectionStatus("Disconnected");

    const handlePreviousMessages = (previousMessages) => {
      setMessages(previousMessages);
    };

    const handleReceiveMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Register listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("previousMessages", handlePreviousMessages);
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup: remove listeners and disconnect socket to avoid memory leaks
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("previousMessages", handlePreviousMessages);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.disconnect();
    };
  }, [username, navigate]);

  const handleSendMessage = (messageText) => {
    socket.emit("sendMessage", {
      username: username,
      message: messageText,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    socket.disconnect();
    navigate("/login");
  };

  return (
    <div className="chat-page">
      <ChatHeader onLogout={handleLogout} />
      <ConnectionStatus status={connectionStatus} />
      <MessageList messages={messages} currentUsername={username} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;