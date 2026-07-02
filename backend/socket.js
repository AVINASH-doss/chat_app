// This file handles all socket.io connection logic

let chatMessages = [];

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log(`New user connected: ${socket.id}`);

    socket.emit("previousMessages", chatMessages);

    socket.on("userJoined", (username) => {
      const joinMessage = {
        username: "System",
        message: `${username} joined the chat`,
        timestamp: new Date().toISOString(),
      };

      chatMessages.push(joinMessage);
      io.emit("receiveMessage", joinMessage);

      socket.username = username;
    });

    socket.on("sendMessage", (data) => {
      const newMessage = {
        username: data.username,
        message: data.message,
        timestamp: new Date().toISOString(),
      };

      chatMessages.push(newMessage);
      io.emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      if (socket.username) {
        const leaveMessage = {
          username: "System",
          message: `${socket.username} left the chat`,
          timestamp: new Date().toISOString(),
        };

        chatMessages.push(leaveMessage);
        io.emit("receiveMessage", leaveMessage);
      }

      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

module.exports = setupSocket;