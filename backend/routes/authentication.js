const express = require("express");
const fetch = require("../utility/fetch");
const { createToken } = require("../utility/JWT");
const tokenModel = require("../models/Token");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await fetch.request("http://10.12.0.15:81/qac.php?login", {
      u: username,
      p: password,
    });

    const { access, login, userName } = result;

    if (login === 1) {
      const token = createToken(result);
      const refreshToken = createToken(result, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "1d",
      });

      const result = await tokenModel.create({
        username: userName,
        token: refreshToken,
        loginuser: username,
        access: access,
      });

      req.session.user = result;
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ auth: true, token, result });
    } else {
      console.log("\x1b[31m%s", userName, "is not in the database!", "\x1b[0m");
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(503);
    console.log(e);
  }
});

module.exports = router;
