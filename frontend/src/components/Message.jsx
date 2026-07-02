import "../styles/Components.css";

function Message({ messageData, isOwnMessage }) {
  // Convert ISO timestamp into a readable time like "10:45 AM"
  const formattedTime = new Date(messageData.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message-row ${isOwnMessage ? "own-message-row" : ""}`}>
      <div className={`message-bubble ${isOwnMessage ? "own-message" : "other-message"}`}>
        {!isOwnMessage && <p className="message-username">{messageData.username}</p>}
        <p className="message-text">{messageData.message}</p>
        <span className="message-time">{formattedTime}</span>
      </div>
    </div>
  );
}

export default Message;