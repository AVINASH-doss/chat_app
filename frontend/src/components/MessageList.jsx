import { useEffect, useRef } from "react";
import Message from "./Message";
import "../styles/Components.css";

function MessageList({ messages, currentUsername }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message whenever the messages array changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <p className="no-messages">No messages yet. Start the conversation!</p>
      )}

      {messages.map((messageData, index) => (
        <Message
          key={index}
          messageData={messageData}
          isOwnMessage={messageData.username === currentUsername}
        />
      ))}

      {/* Empty div used as a scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;