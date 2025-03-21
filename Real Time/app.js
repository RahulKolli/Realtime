// const express = require('express');
// const app = express();
// const socketio = require('socket.io');
// const http = require('http');
// const path = require('path'); 

// const server = http.createServer(app);
// const io = socketio(server);

// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));

// io.on("connection", function(socket){
//     socket.on("send-location",function(data){
//         io.emit("receive-location", {id: socket.id, ...data});
//     });
//     console.log("Connected");
// })
// socket.on("disconnect", function(){
//     io.emit("user-disconnect", socket.id)
// })
// app.get("/", function (req, res) {
//     res.render("index")
// });


// server.listen(3000);

const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const path = require('path'); 

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    console.log(`User Connected: ${socket.id}`);

    // Broadcast location to all users
    socket.on("send-location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle user disconnect
    socket.on("disconnect", function() {
        console.log(`User Disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id); 
    });
});

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000, () => console.log("Server running on port 3000"));
