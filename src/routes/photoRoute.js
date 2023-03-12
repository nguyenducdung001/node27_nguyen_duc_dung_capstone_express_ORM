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
} = require("../controllers/photoController");
const photoRoute = express.Router();

photoRoute.get("/getPhoto", getPhoto);
photoRoute.get("/getPhotoUser/:id", getPhotoUser);
photoRoute.get("/getPhotoComment/:id", getPhotoComment);
photoRoute.get("/getSaveImageById/:id", getSaveImageById);
photoRoute.get("/getSaveImageByIdUser/:id", getSaveImageByIdUser);
photoRoute.get("/getPhotoByIdUser/:id", getPhotoByIdUser);

photoRoute.post("/createComment", createComment);

photoRoute.post("/creatPhoto", createPhoto);

photoRoute.delete("/delPhotoById/:id", delPhotoById);

module.exports = photoRoute;
