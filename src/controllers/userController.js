const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const model = initModels(sequelize);
const bcrypt = require("bcrypt");
const {
  successCode,
  errorCode,
  successCreCode,
} = require("../configs/response");
const { createToken } = require("../utils/jwtoken");

// get all
const getUser = async (req, res) => {
  try {
    let data = await model.nguoi_dung.findAll();

    successCode(res, data, "successfully");
  } catch (err) {
    errorCode(res, "Backend error");
  }
};

// get user id
const getUserId = async (req, res) => {
  try {
    let { id } = req.params;
    let dataOne = await model.nguoi_dung.findOne({
      where: {
        id: id,
      },
    });
    if (dataOne) {
      successCode(res, dataOne, "successfully");
    } else {
      res.status(400).send("User is not exist");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// create user
const createUser = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
    let newUser = {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi,
      anh_dai_dien,
    };
    let data = await model.nguoi_dung.create(newUser);
    if (data) {
      successCreCode(res, data, "create successfully");
    } else {
      res.status(400).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// edit user
const editUser = async (req, res) => {
  try {
    let { id } = req.params;
    let dataOne = await model.nguoi_dung.findOne({
      where: {
        id: id,
      },
    });
    if (dataOne) {
      let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
      let userEdit = {
        email,
        mat_khau,
        ho_ten,
        tuoi,
        anh_dai_dien,
      };
      let editData = await model.nguoi_dung.update(userEdit, {
        where: {
          id: id,
        },
      });
      successCode(res, userEdit, "Edit successfully");
    } else {
      res.status(400).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// delete user
const delUser = async (req, res) => {
  try {
    let { id } = req.params;
    let dataOne = await model.nguoi_dung.findOne({
      where: {
        id: id,
      },
    });
    if (dataOne) {
      await model.nguoi_dung.destroy({
        where: {
          id: id,
        },
      });
      // res.send(dataOne);
      successCode(res, dataOne, "delete successfully");
    } else {
      res.status(400).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// sign up
const signUp = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
    let newUser = {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi,
      anh_dai_dien,
    };
    let data = await model.nguoi_dung.create(newUser);
    if (data) {
      successCreCode(res, data, "sign up successfully");
    } else {
      res.status(400).send("error");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// login
const login = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;
    let checkUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkUser) {
      let checkPass = bcrypt.compareSync(mat_khau, checkUser.mat_khau);
      if (checkPass) {
        let token = createToken(checkUser);
        successCode(res, token, "login successfully");
      } else {
        res.status(400).send("Password is incorrect");
      }
    } else {
      res.status(400).send("Email does not exist");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

module.exports = {
  getUser,
  getUserId,
  createUser,
  editUser,
  delUser,
  signUp,
  login,
};
