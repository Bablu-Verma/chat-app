const express = require("express");
const app = express();

const http = require("http").createServer(app);

app.use(express.static(__dirname + "/public"));

http.listen(8000, () => {
  // console.log("listening on :8000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const io = require("socket.io")(http);

io.on("connection", (Socket) => {
  // console.log("Connected...");

  Socket.on("message", (msg) => {
    // console.log(msg);
    Socket.broadcast.emit("message", msg);
  });

  // console.log(Socket);
});
