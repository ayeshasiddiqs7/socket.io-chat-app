const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg.value);
    console.log("Message: " + msg.value);
  });
});

server.listen(5000, () => {
  console.log("Listening on port:5000");
});
