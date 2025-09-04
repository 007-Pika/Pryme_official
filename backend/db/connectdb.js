const e = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const db_Url = process.env.db_Url;

const connect = async () => {
  try {
    await mongoose.connect(db_Url);
    console.log("Succesfully connected to Database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
