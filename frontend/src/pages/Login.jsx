import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

const handleJoinChat = (e) => {
  e.preventDefault();

  const trimmedName = username.trim();
  if (trimmedName === "") return;

  localStorage.setItem("username", trimmedName);
  navigate("/chat");
};

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleJoinChat}>
        <h1 className="login-title">Real-Time Chat</h1>
        <p className="login-subtitle">Enter a username to join the chat</p>

        <input
          type="text"
          className="login-input"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />

        <button type="submit" className="login-button" disabled={username.trim() === ""}>
          Join Chat
        </button>
      </form>
    </div>
  );
}

export default Login;