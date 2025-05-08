const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      await mongoose.connect(process.env.DATABASE_DEVELOPMENT_URI);
    } else {
      await mongoose.connect(process.env.DATABASE_PRODUCTION_URI);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
