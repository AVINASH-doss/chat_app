import "../styles/Components.css";

function ChatHeader({ onLogout }) {
  return (
    <div className="chat-header">
      <h2 className="chat-title">Real-Time Chat</h2>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default ChatHeader;