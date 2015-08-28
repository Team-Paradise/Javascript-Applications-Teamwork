var io = require('socket.io');

module.exports = function(server){
    io = io(server);
    io.sockets.on('connection', function (socket) {
        socket.on('sent-message', function (data) {  // data = message
            io.sockets.emit('new-message', data);
        });
    });
};
