//jshint esversion: 6, node: true
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

module.exports.create = (req, res) => {
  console.log(req.body);
  const jsonSize = db.get("sedziowie").size();
  const lastItemId = db.get("sedziowie").last().value().id;
  const uniqueId = jsonSize >= lastItemId ? jsonSize + 1 : lastItemId + 1;
  const result = db
    .get("sedziowie")
    .push(req.body)
    .last()
    .assign({ id: uniqueId })
    .write();
  res.send(result);
};

module.exports.readAll = (req, res) => {
  const result = db.get("sedziowie").value();
  res.send(result);
};

module.exports.read = (req, res) => {
  const result = db
    .get("sedziowie")
    .find({ id: parseInt(req.params.id) })
    .value();
  res.send(result);
};

module.exports.update = (req, res) => {
  const result = db
    .get("sedziowie")
    .find({ id: parseInt(req.params.id) })
    .assign(req.body)
    .write();
  res.send(result);
};

module.exports.delete = (req, res) => {
  const result = db
    .get("sedziowie")
    .remove({ id: parseInt(req.params.id) })
    .write();
  res.send(result);
};
