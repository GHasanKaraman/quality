const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const authentication = require("./routes/authentication.js");
const { logger } = require("./middleware/logger.js");
const { connectDB } = require("./utility/db.js");
const { verifyJWT } = require("./utility/JWT.js");

const app = express();

const PORT = process.env.PORT || 4000;

//mongoose connection
const db = connectDB();

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  app.use("/", express.static(path.join(__dirname, "public")));

  //Accepts requests from only react client
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://10.12.11.193:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

  //parse requests to JSON
  app.use(bodyParser.urlencoded({ extended: true }));

  //express session creation, expires in 24 hours
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
  );

  //Logging requests
  app.use(logger);

  app.use(express.json());

  app.use("/", require("./routes/root.js"));

  app.all(/.*/, (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ message: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });

  app.use("/", authentication);

  app.use(verifyJWT);

  app.get("/userInfo", async (req, res) => {
    res.send(req.session.user);
  });

  app.listen(PORT, () => {
    console.log(
      "\x1b[33m%s\x1b[0m",
      "mongo connection established successfully!"
    );
    console.log("\x1b[32m%s\x1b[0m", "Listening on port " + process.env.PORT);
  });
});
