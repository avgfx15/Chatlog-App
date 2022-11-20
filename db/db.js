const mongoose = require("mongoose");
const congif = require("../config/configSecret");

const databaseUrl = congif.dbUrl;

// Connect MongoDB at default port 27017.
const dbConnect = mongoose.connect(databaseUrl, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});

module.exports = dbConnect;
