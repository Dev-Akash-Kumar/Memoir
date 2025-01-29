const mongoose = require("mongoose");
const colors = require("colors");

require("dotenv").config();

const mongoURL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB Connected Successfully".red);
  } catch (error) {
    console.log("MongoDB Connect Failed".red, error);
    process.exit(1);
  }
};

module.exports = connectDB;
