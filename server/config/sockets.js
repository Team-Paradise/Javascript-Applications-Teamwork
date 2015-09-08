var io = require('socket.io'),
    clients = {},
    rooms = [];

module.exports = function (server) {
    io = io(server);
    // io.listen(app);
    io.sockets.on('connection', function (socket) {
        socket.on('sent-message', function (data) {  // data = message
            console.log('SOCKET username on SENT');
            console.log(socket.username);
            io.sockets.in(clients[socket.username].room).emit('new-message', socket.username, data);
        });

        socket.on('new-client', function (data, callback) {
            if (data in clients) {
                callback(false);
            } else {
                callback(true);
                socket.username = data;
                clients[socket.username] = socket;
                console.log('CLIENTSS');
                console.log(clients);

            }
        });

        socket.on('new-room', function (data, callback) {
            if (rooms.indexOf(data) >= 0) {
                callback(false);
            } else {
                rooms.push(data);
                console.log('------------ROOMS');
                console.log(rooms);
                console.log('--------');
                callback(true);
            }

        });

        socket.on('join-room', function (data, callback) {
            console.log('---------ROOM TO JOIN');
            console.log(data.group);
            console.log(rooms.indexOf(data.group));
            if (rooms.indexOf(data.group) >= 0) {
                callback(true);
                clients[data.user].join(data.group);
                clients[data.user].room = data.group;
            } else {
                callback(false);
            }

        });

        socket.on('leave-room', function (data, callback) {
            if (rooms.indexOf(data.group) >= 0) {
                clients[socket.username].leave(data.group);
            } else {
                callback(false);
            }
        });


    });
}
