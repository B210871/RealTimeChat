// Node Server



const io = require("socket.io")(8000)


// header('Acess-Control-Allow-Origin: *');
// header('Acess-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');
// header('Acess-Control-Allow-Origin: Content-Type,x-Auth-Token,Origin,Authorization');

const users = {};


io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    })


    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id] );
        delete users[socket.id];
    })
})