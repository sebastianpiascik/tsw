//jshint esversion: 6, node: true
"use strict";

const express = require("express");
const app = express();
const logger = require("morgan");
const errorHandler = require("errorhandler");
const path = require("path");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const socketio = require("socket.io");

const LocalStrategy = require("passport-local").Strategy;

const port = process.env.PORT || 8081;

let env = process.env.NODE_ENV || "development";
if ("development" === env) {
  app.use(logger("dev"));
  app.use(errorHandler());
}
app.use(express.static("public"));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(
  cookieSession({
    name: "mysession",
    keys: ["vueauthrandomkey"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require('./routes'));
require('./config/passport');

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Express działa na porcie ${port}`);
});
const io = socketio.listen(server);
// io.origins('*:*');

io.on("connect", socket => {
  console.log("Socket.io: połączono.");
  
  socket.on("test", () => {
    console.log("Test");
    io.sockets.emit("test");
  });
  
  socket.on("update scoreboard", data => {
    io.sockets.emit("UPDATE_HORSE", data);
    socket.broadcast.emit("updateData");
  });

  socket.on("disconnect", () => {
    console.log("Socket.io: rozłączono.");
  });

  socket.on("error", err => {
    console.dir(err);
  });
});
