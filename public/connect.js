const socket = io.connect("http://localhost:5000/");

/// Query Seclection and DOM

const message = document.getElementById("message");
const sender = document.getElementById("sender");
const feedback = document.getElementById("feedback");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const outPut = document.getElementById("outPut");

/// Emit Event

/// Send Message and sender
sendMessageBtn.addEventListener("click", async () => {
  if (message.value == "" || sender.value == "") {
    location.reload();
  }
  socket.emit("chat", {
    message: message.value,
    sender: sender.value,
  });
  message.value = "";
  sender.value = "";
});

/// Sender Typing Message Event
message.addEventListener("keypress", async () => {
  socket.emit("typing", {
    sender: sender.value,
  });
});

socket.on("typing", async (data) => {
  console.log(data);
  feedback.innerHTML = "<p><em>" + data.sender + " is typing... </em></p>";
});

/// Chatlog sent event
socket.on("chat", async (data) => {
  feedback.innerHTML = "";
  outPut.innerHTML +=
    "<p><strong>" + data.sender + " : </strong> " + data.message + "</p>";
});

/// Appand Chatmessage and Sender Function
function appandMessage(message, sender) {
  const html = `<p> <strong> ${sender} : </strong> ${message}</p>`;
  outPut.innerHTML += html;
}

/// Display All message from Database
socket.on("outMessage", (data) => {
  if (data.length) {
    data.forEach((data) => {
      appandMessage(data.msg, data.sender);
    });
  }
});
