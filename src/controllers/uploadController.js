const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.cwd()}/public/img`);
  },
  filename: (req, file, callback) => {
    const d = new Date();
    const newName = d.getTime() + "_" + file.originalname;
    callback(null, newName);
  },
});
const upload = multer({ storage });
const uploadImg = upload.single("file");
const uploadImg1 = (req, res) => {
  // let fs = require("fs");
  // fs.readFile(
  //   process.cwd() + "/public/img/" + req.file.filename,
  //   (err, data) => {
  //     let fileName = `"data:${req.file.mimetype};base64,${Buffer.from(
  //       data
  //     ).toString("base64")}"`;
  //     //xoa hình vừa up
  //     fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
  //     res.send(fileName);
  //   }
  // );
  res.send(req.file);
};

module.exports = {
  uploadImg,
  uploadImg1,
};
