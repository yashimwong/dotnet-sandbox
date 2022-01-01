const express = require("express");
const { getAllUsers, createUser, getUser, updateUser, deleteUser } = require("../controllers/user.controller");

const route = express.Router();
route.route("/api/v1/users").get(getAllUsers).post(createUser);
route.route("/api/v1/user/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = route;
