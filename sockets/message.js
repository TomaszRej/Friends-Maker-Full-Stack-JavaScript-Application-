module.exports = (io, socket) => {

  socket.on('send private message', async data => {
    console.log('private message');
    console.log(data)
  })


};
