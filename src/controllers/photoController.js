const {
  failCode,
  successCode,
  successCreCode,
} = require("../configs/response");
const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const model = initModels(sequelize);

// Lấy danh sách hình ảnh

const getPhoto = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll({
      include: ["nguoi_dung"],
    });
    successCode(res, data, "successfully");
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// Lấy thông tin ảnh và người tạo ảnh bằng id ảnh
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
      successCode(res, dataDetail, "successfully");
    } else {
      res.status(400).send("Photo is not exist");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// Lấy thông tin bình luân theo id ảnh
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
      successCode(res, dataCom.binh_luans, "successfully");
    } else {
      res.status(400).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// Lấy thông tin đã lưu hình này hay chưa theo id ảnh
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
        successCode(res, dataSave, "successfully");
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

// Lưu thông tin bình luận của người dùng với ảnh
const createComment = async (req, res) => {
  try {
    let { nguoi_dung_id, hinh_id, noi_dung } = req.body;
    let newComment = {
      nguoi_dung_id,
      hinh_id,
      ngay_binh_luan: Date.now(),
      noi_dung,
    };
    let data = await model.binh_luan.create(newComment);
    if (data) {
      successCreCode(res, data, "create successfully");
    } else {
      res.status(400).send("error");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// Lấy thông tin đã lưu hình ảnh hay chưa theo id người dùng
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
        successCode(res, dataSave, "successfully");
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

// Lấy thông tin hình ảnh được tạo bởi id người dùng
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
        successCode(res, dataSave, "successfully");
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

// Lấy thông tin hình ảnh theo tên
const getPhotoByName = async (req, res) => {
  try {
    let { name } = req.query;
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
        successCode(res, dataName, "successfully");
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

// Tạo ảnh
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
      successCreCode(res, data, "create successfully");
    } else {
      res.status(400).send("error");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// Xóa ảnh theo id
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

      successCode(res, dataOne, "delete successfully");
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
