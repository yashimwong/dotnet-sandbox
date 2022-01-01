const express = require("express");
const { getAllUsers, createUser, getUser, updateUser, deleteUser } = require("../controllers/user.controller");

const route = express.Router();
route.route("/").get(getAllUsers).post(createUser);
route.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = route;
