const mongoose = require("mongoose");

const db = process.env.MONGO_DB;

const database = () => {
  mongoose.connect(db).then(() => {
    console.log("Database connected Successfully");
  });
};

module.exports = database;
