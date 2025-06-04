const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger.js");

const loginLimiter = rateLimit({
  windowMs: 12 * 60 * 1000, // 2 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    status: "error",
    message: "Too many login attempts from this IP. Please try again later.",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "loginLimiter.log"
    );
    res.status(options.statusCode).send(options.message);
  },
});
module.exports = loginLimiter;
