const mongoose = require("mongoose");

const databaseConnection = async (callback) => {
  try {
    console.log(
      "process.env.DATABASE_URL_MONGO ================> ",
      process.env.DATABASE_URL_MONGO
    );
    if (process.env.DATABASE_URL_MONGO) {
      const client = await mongoose.connect(process.env.DATABASE_URL_MONGO);
      if (client) {
        console.log("Database connection successfully made");
        callback();
      }
    } else {
      console.log("Database URL is not provided");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = databaseConnection;
