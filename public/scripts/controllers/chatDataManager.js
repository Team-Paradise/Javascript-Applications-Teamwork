import io from 'socket.io/socket.io.js';
var socket = io.connect();
function addClient(user) {
    socket.emit('new-client', user, function(data){
       // console.log(data);
    });
}

function joinRoom(user, group) {
   /* console.log(user + 'joined to crowd!!');
    console.log(group);*/
    socket.emit('join-room',{user: user, group: group}, function(data){
      /*  console.log('MAYBE user joined specific room');
        console.log(data);*/
    } )
}

function addRoom(group){
    socket.emit('new-room', group, function(data){
       /* console.log('new room!!!');
        console.log(data);
        console.log('---');*/
    })
}

export {addClient, joinRoom, addRoom, socket}