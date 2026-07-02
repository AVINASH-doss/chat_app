import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  // Check localStorage once when the app loads
  const username = localStorage.getItem("username");

  return (
    <Routes>
      <Route
        path="/"
        element={username ? <Navigate to="/chat" replace /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat"
        element={username ? <Chat /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;