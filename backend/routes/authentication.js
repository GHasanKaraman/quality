const express = require("express");
const fetch = require("../utility/fetch");
const { createToken } = require("../utility/JWT");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await fetch.request("http://10.12.0.15:81/qac.php?login", {
      u: username,
      p: password,
    });

    const { login, userName } = result;

    if (login === 1) {
      const token = createToken(result);

      req.session.user = result;
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
