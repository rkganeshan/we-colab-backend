const { Server } = require('socket.io');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('drawing', (data) => {
      const { roomId, drawData } = data;
      socket.to(roomId).emit('drawing', drawData);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });
};

module.exports = setupSocket;
