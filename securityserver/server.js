"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var expressJwt = require("express-jwt");
var controller_1 = require("./app/players/controller");
var controller_2 = require("./app/users/controller");
var app = express();
var jwtCheckMiddleware = expressJwt({
    secret: process.env['SECRET']
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 8080;
var router = express.Router();
router.get('/', function (req, res) {
    res.json({ message: 'Hi there, welcome to NativeScripting' });
});
router.post('/register', controller_2.registerUser);
router.post('/login', controller_2.loginUser);
router.get('/players', jwtCheckMiddleware, controller_1.getPlayers);
router.get('/players/:id', jwtCheckMiddleware, controller_1.getPlayerById);
app.use('/api', router);
app.listen(port);
