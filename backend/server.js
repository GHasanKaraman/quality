require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const { logger, logEvents } = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

const corsOptions = require("./config/corsOptions.js");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn.js");
const { verifyJWT } = require("./utility/JWT.js");

const PORT = process.env.PORT || 4000;

console.log(process.env.NODE_ENV);

//mongoose connection
connectDB();

//Logging requests
app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/", require("./routes/authentication"));
app.use("/users", require("./routes/userRoutes"));

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

app.use(errorHandler);

//app.use(verifyJWT);

app.get("/userInfo", async (req, res) => {
  res.send(req.session.user);
});

mongoose.connection.once("open", () => {
  console.log("\x1b[33m%s\x1b[0m", "Connected to MongoDB!");
  app.listen(PORT, () => {
    console.log("\x1b[32m%s\x1b[0m", "Server running on port " + PORT);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}\n`,
    "mongoErrLog.log"
  );
});
