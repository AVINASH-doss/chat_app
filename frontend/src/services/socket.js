import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

// Create a single socket instance for the whole app.
// autoConnect is false so we control exactly when it connects (on Chat page load).
const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;