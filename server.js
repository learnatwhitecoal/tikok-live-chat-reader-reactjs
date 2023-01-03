require("dotenv").config();
const { WebcastPushConnection } = require("tiktok-live-connector");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

// Enable cross origin resource sharing
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

// Serve frontend files
app.use(express.static("public"));

// Start http listener
const port = process.env.PORT || 8000;
httpServer.listen(port);
console.info(`Server running! Please visit http://localhost:${port}`);
