const jwt = require("jsonwebtoken");
const { failCodeAuth } = require("../configs/response");

const createToken = (data) => {
  let token = jwt.sign({ data }, "key", { expiresIn: "10m" });
  return token;
};

const checkToken = (token) => {
  let check = jwt.verify(token, "key");
  return check;
};

const verifyToken = (req, res, next) => {
  try {
    let { tokenalex } = req.headers;
    let inspectToken = checkToken(tokenalex);
    if (inspectToken) {
      next();
    }
  } catch (err) {
    failCodeAuth(res, err, "No auth");
  }
};

module.exports = {
  createToken,
  checkToken,
  verifyToken,
};
