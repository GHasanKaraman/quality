const { sign, verify } = require("jsonwebtoken");

const createToken = (
  user,
  secret = process.env.JWT_ACCESS_SECRET,
  options = { expiresIn: "30s" },
) => {
  const token = sign(
    { username: user.userName, access: user.access },
    secret,
    options,
  );
  return token;
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
    }
    req.user = decoded.userName;
    next();
  });
};

module.exports = { createToken, verifyJWT };
