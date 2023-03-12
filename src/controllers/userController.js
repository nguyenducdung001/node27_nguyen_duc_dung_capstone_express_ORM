const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const model = initModels(sequelize);

// get all
const getUser = async (req, res) => {
  try {
    let data = await model.nguoi_dung.findAll();

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Backend errors");
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
      res.status(200).send(dataOne);
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
      mat_khau,
      ho_ten,
      tuoi,
      anh_dai_dien,
    };
    let data = await model.nguoi_dung.create(newUser);
    if (data) {
      res.status(201).send(data);
    } else {
      res.status(400).send("error");
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
      res.status(200).send(userEdit);
    } else {
      res.status(400).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Backend errors");
  }
};

// delete user
const delUser = async (req, res) => {
  // try {
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
    res.send(dataOne);
  } else {
    res.status(400).send("Not found");
  }
  // } catch (err) {
  //   res.status(500).send("Backend errors");
  // }
};

module.exports = {
  getUser,
  getUserId,
  createUser,
  editUser,
  delUser,
};
