const jwt = require("jsonwebtoken");
const SECRET = "UpTiltWaft";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    SECRET,
    {
      expiresIn: "1y",
      algorithm: "HS256",
    }
  );
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (e) {
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
};