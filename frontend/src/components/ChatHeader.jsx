import "../styles/Components.css";

function ChatHeader({ onLogout }) {
  return (
    <div className="chat-header">
      <h2>ChatConnect</h2>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default ChatHeader;