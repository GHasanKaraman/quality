const morgan = require("morgan");
const chalk = require("chalk");
const moment = require("moment-timezone");

require("console-stamp")(console, {
  format: "(->).yellow :date().bold.black.bgRed",
});

const logger = () => {
  if (process.env.NODE_ENV === "dev") {
    return morgan(function (tokens, req, res) {
      return [
        "\n",
        chalk.hex("#ff4757").bold("🍄  Morgan --> "),
        chalk.hex("#34ace0").bold(tokens.method(req, res)),
        chalk.hex("#ffb142").bold(tokens.status(req, res)),
        chalk.hex("#ff5252").bold(tokens.url(req, res)),
        chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
        chalk
          .hex("#f78fb3")
          .bold(
            "@ " +
              moment(tokens.date(req, res))
                .tz("America/New_York")
                .format("LLLL"),
          ),
        chalk.yellow(tokens["remote-addr"](req, res)),
        chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
        chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
        "\n",
      ].join(" ");
    });
  }

  var accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });
  return morgan({
    format: "[:date[clf]] :remote-addr :method :url :status :response-time ms",
    stream: {
      write: function (str) {
        accessLogStream.write(str);
        console.log(str);
      },
    },
  });
};

module.exports = { logger };
