const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var chatSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = ChatMessages = mongoose.model("ChatMessages", chatSchema);
