//jshint esversion: 6, node: true
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

module.exports.create = (req, res) => {
  console.log(req.body);
  const jsonSize = db.get("konie").size();
  const lastItemId = db.get("konie").last().value().id;
  const uniqueId = jsonSize >= lastItemId ? jsonSize + 1 : lastItemId + 1;
  const result = db
    .get("konie")
    .push(req.body)
    .last()
    .assign({ id: uniqueId })
    .write();
  res.send(result);
};

module.exports.readAll = (req, res) => {
  const result = db.get("konie").value();
  res.send(result);
};

module.exports.read = (req, res) => {
  const result = db
    .get("konie")
    .find({ id: parseInt(req.params.id) })
    .value();
  res.json(result);
};

module.exports.readByClass = (req, res) => {
  const result = db
    .get("konie")
    .filter({ klasa: parseInt(req.params.id) })
    .value();
  res.json(result);
};

module.exports.update = (req, res) => {
  const result = db
    .get("konie")
    .find({ id: parseInt(req.params.id) })
    .assign(req.body)
    .write();
  res.send(result);
};

module.exports.delete = (req, res) => {
  const result = db
    .get("konie")
    .remove({ id: parseInt(req.params.id) })
    .write();
  res.send(result);
};
