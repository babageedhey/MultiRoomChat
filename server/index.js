const express           = require('express');
const app               = express();
const http              = require('http');
const server            = http.Server(app);
const socketIO          = require('socket.io');
const io                = socketIO(server);
const port              = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log(`Server listening on: ${port}`)
})

io.on('connection', (socket)=>{
    console.log(`New User Connected`, socket.id)

    //Joining a specific room for chat
    socket.on('join',(data)=>{
        socket.join(data.room);
        console.log(data.user + ` joined ` + data.room + ` chat room`)
        socket.broadcast.to(data.room).emit({user:data.user, message:` joined the chat`})
    })

    //Leaving a chat Room
    socket.on('leave', (data)=>{
        console.log(data.user + ` left ` + data.room )
        socket.broadcast.to(data.room).emit({user:data.user, message: `left`})
        socket.leave(data.room);
    })

    //Sending messages to everyone
    socket.on('message', (data)=>{
        console.log(data.user + ` sent a message`)
        io.in(data.room).emit('new message', {user:data.user, message:data.message})
    })

    //Listen when user disconects from the socket
    socket.on('disconnect', ()=>{
        console.log(`User: ${socket.id} disconnected`)
    });
})