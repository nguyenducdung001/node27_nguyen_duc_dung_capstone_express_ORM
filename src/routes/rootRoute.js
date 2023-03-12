const express = require("express");
const photoRoute = require("./photoRoute");
const userRoute = require("./userRoute");
const rootRoute = express.Router();

rootRoute.use("/user", userRoute);
rootRoute.use("/photo", photoRoute);

module.exports = rootRoute;
