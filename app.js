/// Initialize express
const express = require("express");
/// Initialize socket.io
const socket = require("socket.io");
/// App setup
const app = express();

/// Initialize path for render hbs file
const path = require("path");
/// Initialize Config File
const config = require("./config/configSecret");
/// Port define to run app
const port = config.port;

/// Database Connection
const dbConnect = require("./db/db");

/// Message Model

const ChatMessages = require("./models/chatModel");

/// Configure Static html File in public Folder with index.html
app.use(express.json());
app.use(express.static("public"));

/// Configure App to run on port setup
const server = app.listen(port, () =>
  console.log(`Chat app listening on port ${port}!`)
);

/// Configure App to check or test routes
app.get("/", (req, res) => {
  res.render("demo");
});

/// Socket Server side Setup

const io = socket(server);

io.on("connection", async (socket) => {
  console.log("Made Socket Connection", socket.id);

  /// Handle Chat Event

  /// Get All chat from MongoDB

  const allChatMessages = await ChatMessages.find();
  if (allChatMessages) {
    socket.emit("outMessage", allChatMessages);
  }

  /// Save All Chatlog in MongoDB

  socket.on("chat", async (data) => {
    if (data.message == "" || data.sender == "") {
      socket.on("disconnect", function () {
        console.log("disconnect: ", socket.id);
      });
    }

    /// Saving ChatMessage in MongoDB
    const chatlog = new ChatMessages({
      msg: data.message,
      sender: data.sender,
    });
    if (chatlog) {
      const save = await chatlog.save();
      io.sockets.emit("chat", data);
    }
  });

  socket.on("typing", async (data) => {
    socket.broadcast.emit("typing", data);
  });
});
