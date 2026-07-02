// This file handles all socket.io connection logic

// Array to store chat messages in memory (no database used)
let chatMessages = [];

function setupSocket(io) {
  // Runs whenever a new user connects
  io.on("connection", (socket) => {
    console.log(`New user connected: ${socket.id}`);

    // Send previous messages to the newly connected user
    socket.emit("previousMessages", chatMessages);

    // Listen for "sendMessage" event from client
    socket.on("sendMessage", (data) => {
      // data should contain username and message from client
      const newMessage = {
        username: data.username,
        message: data.message,
        timestamp: new Date().toISOString(),
      };

      // Store message in memory
      chatMessages.push(newMessage);

      // Broadcast the new message to all connected users
      io.emit("receiveMessage", newMessage);
    });

    // Runs when a user disconnects
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

module.exports = setupSocket;