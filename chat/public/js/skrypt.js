//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let appConnection = document.querySelector(".app__connection");
  let appChat = document.querySelector(".app__chat");
  let messagesContainer = document.getElementById("messages");
  let connectButton = document.getElementById("open");
  let disconnectButton = document.getElementById("close");
  let sendButton = document.getElementById("send");
  let messageInput = document.getElementById("message");
  let userNameInput = document.getElementById("userName");
  let chat;

  let username;

  const createNode = (node, attributes) => {
    const el = document.createElement(node);
    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
    return el;
  };

  const addInfo = info => {
    let listElement = createNode("li", {});
    listElement.innerHTML = info;
    messagesContainer.appendChild(listElement);
  };

  const addMessage = data => {
    let listElement;
    console.log(data.username, username);
    if (data.username === username) {
      listElement = createNode("li", { class: "highlighted" });
    } else {
      listElement = createNode("li", {});
    }
    listElement.innerHTML = data.username + " : " + data.message;
    messagesContainer.appendChild(listElement);
  };

  const addNewUser = () => {
    if (username) {
      chat.emit("add user", username);
    } else {
      chat.emit("add user", userNameInput.value);
      username = userNameInput.value;
    }
    appConnection.style.display = "none";
    appChat.style.display = "block";
  };

  connectButton.addEventListener("click", (e) => {
    e.preventDefault();

    let chatURL = `http://${location.host}`;
    console.log(chatURL);
    chat = io(chatURL);

    chat.on("connect", () => {
      console.log("Nawiązano połączenie przez Socket.io");
      addNewUser();
    });
    chat.on("reconnect", () => {
      console.log("Nawiązano ponowniepołączenie przez Socket.io");
      addNewUser();
    });
    chat.on("disconnect", () => {
      console.log("Połączenie przez Socket.io zostało zakończone");
    });
    chat.on("error", err => {
      console.log(`Błąd połączenia z serwerem: "${JSON.stringify(err)}"`);
    });
    chat.on("chat message", data => {
      addMessage(data);
    });
    chat.on("user joined", data => {
      let info =
        data.username + " dołączył (ilość osób: " + data.numUsers + ")";
      addInfo(info);
    });
  });

  // disconnectButton.addEventListener("click", () => {
  //   chat.disconnect();
  // });

  sendButton.addEventListener("click", e => {
    e.preventDefault();
    chat.emit("chat message", {
      username: username,
      message: messageInput.value
    });
    console.log(`Wysłałem wiadomość: ${messageInput.value}`);
    messageInput.value = "";
  });
});
