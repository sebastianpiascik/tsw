//jshint node: true, esversion: 6
const express = require("express");
const app = express();
const path = require("path");
const less = require("less-middleware");
const server = require("http").createServer(app);
const socketio = require("socket.io");
const io = socketio.listen(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

app.use(
  less(path.join(__dirname, "/src"), {
    dest: path.join(__dirname, "/public")
  })
);
app.use(express.static(path.join(__dirname, "public")));

let numUsers = 0;

io.sockets.on("connect", socket => {
  let addedUser = false;
  console.log("Socket.io: połączono.");

  socket.join(`a${numUsers} room`);
  

  socket.on("add user", username => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;

    io.emit("user joined", {
      username: socket.username,
      numUsers: numUsers
    });

    socket.broadcast.to(`a${numUsers-1} room`).emit("chat message", {
        username: socket.username,
        message: 'xd ale tylko 1'
      });
    io.sockets.in(`a0 room`).emit("chat message", {
        username: socket.username,
        message: 'xddddddddd'
      });
  });

  socket.on("chat message", data => {
    io.emit("chat message", {
      username: socket.username,
      message: data.message
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket.io: rozłączono.");
  });

  socket.on("error", err => {
    console.dir(err);
  });
});
