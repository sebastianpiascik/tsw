//jshint esversion: 6, node: true
"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local');

let users = require('./users.json'); 

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (username, password, done) => {
      let user = users.find(user => {
        return user.email === username && user.password === password;
      });
      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: "Incorrect username or password" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = users.find(user => {
    return user.id === id;
  });

  done(null, user);
});