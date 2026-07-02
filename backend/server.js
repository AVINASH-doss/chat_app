// Import required packages
const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const setupSocket = require("./socket");

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();

// Enable CORS so frontend (running on a different port/domain) can connect
app.use(cors());

// Create HTTP server using express app (needed for socket.io to attach to it)
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Simple test route to check if server is running
app.get("/", (req, res) => {
  res.send("Chat backend is running...");
});

// Setup all socket.io related event handling in a separate file
setupSocket(io);

// Get port from .env file, fallback to 5000 if not defined
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});