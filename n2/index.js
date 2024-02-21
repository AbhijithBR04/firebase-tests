const functions = require('firebase-functions');
const admin = require('firebase-admin');
const io = require('socket.io')();

admin.initializeApp();

io.on('connection', (client) => {
  console.log('a user connected');

  client.on('disconnect', () => {
    console.log('user disconnected');
  });
});

exports.chat = functions.https.onRequest((request, response) => {
  // Not handling HTTP requests here since we're using WebSocket
  response.send("WebSocket server for chat");
});

exports.handleNewMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate((snapshot, context) => {
    const message = snapshot.data();
    io.emit('message', message);
  });
