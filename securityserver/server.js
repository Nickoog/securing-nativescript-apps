"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 8080;
var router = express.Router();
router.get('/', function (req, res) {
    res.json({ message: 'Hi there' });
});
app.use('/api', router);
app.listen(port);
