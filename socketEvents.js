exports = module.exports = io => {
  io.on('connection', socket => {
    console.log('Client connected!');


    socket.on('createChatRoom', (data) => {
      console.log("data", data);

      const roomName = data.userId + data.friendId;


      const {user} = addUser({id: socket.id, room: roomName})


      socket.join(roomName, () => {
        let rooms = Object.keys(socket.rooms);

        console.log(rooms);


        console.log(socket.rooms, "socketrooms")
      })

    });


    socket.on("sendMessage", (msg) => {
      const user = getUser(socket.id);
      io.to(user.room).emit('message', {userId: user.id,msg:msg })

      console.log(msg, "WIADOMOSC Z CZATU BACK");
      console.log(user.room , "moj pokoj ")
      let rooms = Object.keys(socket.rooms);
      console.log(rooms, "pokoje")
    });


    socket.on('disconnect', function () {
      console.log('user disconnected');
    });


  })
};


