const { failCode, successCode } = require("../configs/response");
const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const model = initModels(sequelize);

// get photo

const getPhoto = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll({
      include: ["nguoi_dung"],
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// get photo detail
const getPhotoUser = async (req, res) => {
  try {
    let { id } = req.params;
    let dataDetail = await model.hinh_anh.findOne({
      where: {
        id: id,
      },
      include: ["nguoi_dung"],
    });
    if (dataDetail) {
      res.status(200).send(dataDetail);
    } else {
      res.status(400).send("Photo is not exist");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// get photo detail comment
const getPhotoComment = async (req, res) => {
  try {
    let { id } = req.params;
    let dataCom = await model.hinh_anh.findOne({
      where: {
        id: id,
      },
      include: ["binh_luans"],
    });
    if (dataCom) {
      res.status(200).send(dataCom.binh_luans);
    } else {
      res.status(400).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// get save image by id
const getSaveImageById = async (req, res) => {
  try {
    let { id } = req.params;
    let dataCom = await model.hinh_anh.findOne({
      where: {
        id: id,
      },
    });
    if (dataCom) {
      let dataSave = await model.luu_anh.findOne({
        where: {
          hinh_id: dataCom.id,
        },
      });
      if (dataSave) {
        res.status(200).send(dataSave);
      } else {
        failCode(res, dataCom, "This img has not been saved yet ");
      }
    } else {
      res.status(400).send("not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// post comment
const createComment = async (req, res) => {
  try {
    let { nguoi_dung_id, hinh_id, noi_dung } = req.body;
    let newComment = {
      nguoi_dung_id,
      hinh_id,
      noi_dung,
    };
    let data = await model.binh_luan.create(newComment);
    if (data) {
      res.status(201).send(data);
    } else {
      res.status(400).send("error");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// get save image by id user
const getSaveImageByIdUser = async (req, res) => {
  try {
    let { id } = req.params;
    let dataCom = await model.nguoi_dung.findOne({
      where: {
        id: id,
      },
    });
    if (dataCom) {
      let dataSave = await model.luu_anh.findOne({
        where: {
          nguoi_dung_id: dataCom.id,
        },
      });
      if (dataSave) {
        res.status(200).send(dataSave);
      } else {
        failCode(res, dataCom, "This user hasn't saved any img yet");
      }
    } else {
      res.status(400).send("not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// get photo created by id user
const getPhotoByIdUser = async (req, res) => {
  try {
    let { id } = req.params;
    let dataCom = await model.nguoi_dung.findOne({
      where: {
        id: id,
      },
    });
    if (dataCom) {
      let dataSave = await model.hinh_anh.findAll({
        where: {
          nguoi_dung_id: id,
        },
      });
      if (dataSave) {
        res.status(200).send(dataSave);
      } else {
        failCode(res, dataCom, "No img of this user");
      }
    } else {
      res.status(400).send("user not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// get photo by name
const getPhotoByName = async (req, res) => {
  try {
    let { name } = req.params;
    let dataCom = await model.hinh_anh.findOne({
      where: {
        ten_hinh: name,
      },
    });
    if (dataCom) {
      let dataName = await model.hinh_anh.findAll({
        where: {
          ten_hinh: dataCom.ten_hinh,
        },
      });
      if (dataName) {
        res.status(200).send(dataName);
      } else {
        res.status(400).send("not found");
      }
    } else {
      res.status(400).send("not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// create photo
const createPhoto = async (req, res) => {
  try {
    let { ten_hinh, duong_dan, mo_ta, nguoi_dung_id } = req.body;
    let newPhoto = {
      ten_hinh,
      duong_dan,
      mo_ta,
      nguoi_dung_id,
    };
    let data = await model.hinh_anh.create(newPhoto);
    if (data) {
      res.status(201).send(data);
    } else {
      res.status(400).send("error");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// delete photo by id
const delPhotoById = async (req, res) => {
  try {
    let { id } = req.params;
    let dataOne = await model.hinh_anh.findOne({
      where: {
        id: id,
      },
    });
    if (dataOne) {
      await model.hinh_anh.destroy({
        where: {
          id: id,
        },
      });
      res.send(dataOne);
    } else {
      res.status(400).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

module.exports = {
  getPhoto,
  getPhotoUser,
  getPhotoComment,
  createComment,
  getSaveImageById,
  getSaveImageByIdUser,
  getPhotoByIdUser,
  delPhotoById,
  createPhoto,
  getPhotoByName,
};
