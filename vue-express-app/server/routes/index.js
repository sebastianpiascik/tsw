//jshint esversion: 6, node: true
const express = require('express');
const router = express.Router();

router.use("/sedziowie", require("./api/judge"));
router.use("/konie", require("./api/horse"));
router.use("/klasy", require("./api/class"));
router.use("/", require("./api/auth"));

module.exports = router;