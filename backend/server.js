const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");

const authentication = require("./routes/authentication.js");
const { logger } = require("./utility/logger");
const { connectDB } = require("./utility/db.js");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

//mongoose connection
const db = connectDB();

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  //Accepts requests from only react client
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://10.12.11.193:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    }),
  );

  //parse requests to JSON
  app.use(bodyParser.urlencoded({ extended: true }));

  //express session creation, expires in 24 hours
  app.use(
    session({
      secret: "ciboqa",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 6000 * 60 * 24 },
    }),
  );

  //Logging requests
  app.use(logger());

  app.use((req, res, next) => {
    if ("OPTIONS" === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.get("/", async (req, res) => {
    res.send("Server is running...");
  });

  app.use("/", authentication);

  app.listen(PORT, () => {
    console.log(
      "\x1b[33m%s\x1b[0m",
      "mongo connection established successfully!",
    );
    console.log("\x1b[32m%s\x1b[0m", "Listening on port " + process.env.PORT);
  });
});
