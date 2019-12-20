"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var util_1 = require("../../app/shared/util");
var USERS_FILE = './app/data/users.json';
function ensureUserFile() {
    if (fs.existsSync(USERS_FILE)) {
        return;
    }
    else {
        fs.appendFileSync(USERS_FILE, '{ "users": [] }');
    }
}
function getUsers() {
    ensureUserFile();
    var fileContents = fs.readFileSync(USERS_FILE);
    var fileContentsStr = fileContents.toString();
    var users = JSON.parse(fileContentsStr).users;
    return users;
}
exports.getUsers = getUsers;
function createUser(user) {
    var users = getUsers();
    var newId = util_1.newGuid();
    users.push(__assign(__assign({}, user), { id: newId }));
    var newUsersDataStr = JSON.stringify({ users: users });
    fs.writeFileSync(USERS_FILE, newUsersDataStr);
}
exports.createUser = createUser;
function getUser(email) {
    var users = getUsers();
    var foundUser = users.find(function (u) { return u.email === email; });
    return foundUser;
}
exports.getUser = getUser;
