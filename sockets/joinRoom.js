const Room = require('../models/Room');

module.exports = (io, socket) => {

  socket.on('join private room', async data => {

    const room = await Room.find({
      users: {
        $all: [data.emitterId, data.receiverId]
      }
    });

    if (room) {
      socket.join(room[0]._id);
      return
    }

    console.warn('room', room);

    const newRoom = new Room({users: [data.emitterId, data.receiverId]});
    newRoom.save();

    socket.join(newRoom._id);
  })

};
