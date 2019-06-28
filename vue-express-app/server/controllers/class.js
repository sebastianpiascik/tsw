//jshint esversion: 6, node: true
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

module.exports.create = (req, res) => {
  console.log(req.body);
  const jsonSize = db.get("klasy").size();
  const lastItemId = db.get("klasy").last().value().id;
  const uniqueId = jsonSize >= lastItemId ? jsonSize + 1 : lastItemId + 1;
  const result = db
    .get("klasy")
    .push(req.body)
    .last()
    .assign({ id: uniqueId })
    .write();
  res.send(result);
};

module.exports.readAll = (req, res) => {
  const result = db.get("klasy").value();
  res.send(result);
};

module.exports.read = (req, res) => {
  const result = db
    .get("klasy")
    .find({ id: parseInt(req.params.id) })
    .value();
  res.send(result);
};

module.exports.update = (req, res) => {
  const result = db
    .get("klasy")
    .find({ id: parseInt(req.params.id) })
    .assign(req.body)
    .write();
  res.send(result);
};

module.exports.delete = (req, res) => {
  const result = db
    .get("klasy")
    .remove({ id: parseInt(req.params.id) })
    .write();
  res.send(result);
};
