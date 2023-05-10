const mongoose = require("mongoose");

function mongoDb(url) {
  if (!url) {
    throw new Error("Mongo URI Not found");
  }
  mongoose.connect(url);

  mongoose.connection.on("connected", function () {
    console.log("MongoDB connection is established.");
  });

  mongoose.connection.on("disconnected", function () {
    console.log("MongoDB Connection is closed");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close();
    process.exit(0);
  });
}

module.exports = mongoDb;
