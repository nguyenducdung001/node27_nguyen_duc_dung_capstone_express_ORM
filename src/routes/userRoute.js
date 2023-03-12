const express = require("express");
const {
  getUser,
  getUserId,
  createUser,
  editUser,
  delUser,
} = require("../controllers/userController");
const userRoute = express.Router();

userRoute.get("/getUser", getUser);
userRoute.get("/getUserId/:id", getUserId);

userRoute.post("/createUser", createUser);
userRoute.put("/editUser/:id", editUser);

userRoute.delete("/delUser/:id", delUser);

module.exports = userRoute;
