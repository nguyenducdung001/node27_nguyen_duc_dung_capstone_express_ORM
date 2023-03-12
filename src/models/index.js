// kết nối CSDL
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_pinterest", "root", "dungKute01@", {
  host: "localhost",
  port: "3308",
  dialect: "mysql", // hệ CSDL đang sử dụng
});

const checkConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công");
  } catch {
    console.log("Kết nối thất bại");
  }
};

checkConnect();

module.exports = sequelize;
