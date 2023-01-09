const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./Db/conn");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const router = require("./Router/mainRouter");


app.use(router);


const server = app.listen(PORT, () => {
    console.log(`${PORT}`);
});

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {

    socket.on("send-message", (room) => {
        io.to(room).emit("recieve-message", room);
    });

    socket.on("join room", (chatId) => {
        socket.join(chatId);
    });

    socket.on("leave", (id) => {
        socket.leave(id);
    });

    socket.on("remove-user", (chatId) => {
        io.to(chatId).emit("remove", chatId);
    });

    socket.on("add-user", (chatId) => {
        io.to(chatId).emit("add", chatId);
    });
    socket.on("delete-user", (chatId) => {
        io.to(chatId).emit("delete", chatId);
    });
    socket.on("rename-group", (chatId) => {
        io.to(chatId).emit("rename", chatId);
    });

});


