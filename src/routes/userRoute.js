const express = require("express");
const {
  getUser,
  getUserId,
  createUser,
  editUser,
  delUser,
  signUp,
  login,
} = require("../controllers/userController");
const { verifyToken } = require("../utils/jwtoken");
const userRoute = express.Router();

userRoute.get("/getUser", verifyToken, getUser);
userRoute.get("/getUserId/:id", verifyToken, getUserId);

userRoute.post("/createUser", verifyToken, createUser);
userRoute.post("/signUp", signUp);
userRoute.post("/login", login);
userRoute.put("/editUser/:id", verifyToken, editUser);

userRoute.delete("/delUser/:id", verifyToken, delUser);

module.exports = userRoute;
