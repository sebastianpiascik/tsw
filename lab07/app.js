//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();

const logger = require('morgan');
const errorHandler = require('errorhandler');

const less = require('less-middleware');

const routes = require('./routes');
const path = require('path');

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

let env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    app.use(logger('dev'));
    app.use(errorHandler());
}

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(less(path.join(__dirname, '/src'), {
  dest: path.join(__dirname, '/public')
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', routes.index);

app.post("/game/new", routes.createNewGame);
app.post("/game/move", routes.makeMove);
app.post("/game/status", routes.checkStatus);
app.post("/game/current", routes.getCurrentGame);

app.listen(port, () => {
	console.log(`Express działa na porcie ${port}`);
});