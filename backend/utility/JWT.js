const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const token = sign(
    { username: user.userName, access: user.access },
    process.env.JWT_SECRET,
  );
  return token;
};

module.exports = { createToken };
