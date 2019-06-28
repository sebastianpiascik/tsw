//jshint node: true, esversion: 6
const uuidv1 = require("uuid/v1");

exports.index = (req, res) => {
  res.render("index", {
    title: "Wyniki"
  });
};
