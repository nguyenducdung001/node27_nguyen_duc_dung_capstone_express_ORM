const express = require("express");
const {
  getPhoto,
  getPhotoComment,
  getPhotoUser,
  createComment,
  getSaveImageById,
  getSaveImageByIdUser,
  getPhotoByIdUser,
  delPhotoById,
  createPhoto,
  getPhotoByName,
} = require("../controllers/photoController");
const { uploadImg, uploadImg1 } = require("../controllers/uploadController");

const { verifyToken } = require("../utils/jwtoken");
const photoRoute = express.Router();

photoRoute.get("/getPhoto", verifyToken, getPhoto);
photoRoute.get("/getPhotoUser/:id", getPhotoUser);
photoRoute.get("/getPhotoComment/:id", verifyToken, getPhotoComment);
photoRoute.get("/getSaveImageById/:id", verifyToken, getSaveImageById);
photoRoute.get("/getSaveImageByIdUser/:id", verifyToken, getSaveImageByIdUser);
photoRoute.get("/getPhotoByIdUser/:id", verifyToken, getPhotoByIdUser);
photoRoute.get("/getPhotoByName", verifyToken, getPhotoByName);

photoRoute.post("/createComment", verifyToken, createComment);

photoRoute.post("/creatPhoto", verifyToken, createPhoto);

photoRoute.post("/upload", uploadImg, uploadImg1);

photoRoute.delete("/delPhotoById/:id", verifyToken, delPhotoById);

module.exports = photoRoute;
