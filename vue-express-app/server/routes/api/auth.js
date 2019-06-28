//jshint esversion: 6, node: true
const express = require('express');
const router = express.Router();
const passport = require('passport');

let users = require('./../../config/users.json'); 

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }

    req.login(user, err => {
      res.send(user);
    });
  })(req, res, next);
});

router.get("/logout", function(req, res) {
  req.logout();

  console.log("logged out");

  return res.send();
});

const authMiddleware = (req, res, next) => {
  console.log(req.session);
  if (!req.isAuthenticated()) {
    res.status(401).send("You are not authenticated");
  } else {
    return next();
  }
};

router.get("/user", authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user;
  });

  console.log([user, req.session]);

  res.send({ user: user });
});

module.exports = router;