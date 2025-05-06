const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", false);
  if (process.env.NODE_ENV === "dev") {
    mongoose.connect(process.env.MONGO_DEV);
  } else {
    mongoose.connect(process.env.MONGO_PRODUCTION);
  }
  return mongoose.connection;
};

module.exports = { connectDB };
