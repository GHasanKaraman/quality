const morgan = require("morgan");
const moment = require("moment-timezone");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (logItem, logFileName) => {
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem,
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = morgan(
  function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.status(req, res),
      tokens.url(req, res),
      tokens["response-time"](req, res) + " ms",

      "@ " +
        moment(tokens.date(req, res)).tz("America/New_York").format("LLLL"),
      tokens["remote-addr"](req, res),
      "from " + tokens.referrer(req, res),
      tokens["user-agent"](req, res),
    ].join(" ");
  },
  {
    stream: {
      write: (message) => {
        logEvents(message, "reqLog.log");
        console.log(message);
      },
    },
  },
);

module.exports = { logEvents, logger };
