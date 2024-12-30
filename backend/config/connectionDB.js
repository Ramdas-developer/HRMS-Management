const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(`${process.env.CLUSTER_MONGODB_URL}`);         // cluster password = future@123
    console.log("Database Connected succeessfully");
  } catch (error) {
    console.log("Database connection failed",error.message); 
  }
};
const db = ConnectDB();

module.exports = db;
