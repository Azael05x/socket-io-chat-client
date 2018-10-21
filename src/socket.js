import io from 'socket.io-client';

export default class {
  constructor() {
    // TODO: Move to const
    this.socket = io.connect('http://localhost:8081');
    this.socket.on('error', (err) => console.log('received socket error:', err));
  }


  registerChatHandler(onMessageReceived, onKickedReceived) {
    console.log('registerChatHandler');
    this.socket.on('message', onMessageReceived);
    this.socket.on('kicked', onKickedReceived);
  }

  unregisterChatHandler() {
    console.log('unregisterChatHandler');
    this.socket.off('message');
    this.socket.off('kicked');
  }

  registerLandingHandler(onSuccess, onFail) {
    console.log('registerLandingHandler');
    this.socket.on('joinSuccess', (nickname) => { onSuccess(nickname) });
    this.socket.on('joinFail', (error) => { onFail(error) });
  }

  unregisterLandingHandler() {
    console.log('unregisterLandingHandler');
    this.socket.off('joinSuccess');
    this.socket.off('joinFail');
  }

  join(nickname) {
    this.socket.emit('join', nickname);
  }

  leave() {
    this.socket.emit('leave');
  }

  message(text) {
    this.socket.emit('message', text);
  }
}
