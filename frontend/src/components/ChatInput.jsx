import { useState } from "react";
import "../styles/Components.css";

function ChatInput({ onSendMessage }) {
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
    if (messageText.trim() === "") return;
    onSendMessage(messageText);
    setMessageText("");
  };

  // Send message when Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="send-button"
        onClick={handleSend}
        disabled={messageText.trim() === ""}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;