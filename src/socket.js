import io from 'socket.io-client';

export default class {
  constructor(onConnection, onConnectionError, onDisconnect) {
    this.socket = io.connect(process.env.REACT_APP_SOCKET_HOST);

    this.socket.on('error', (err) => console.log('received socket error:', err));
    this.socket.on('connect', () => onConnection());
    this.socket.on('disconnect', (reason) => onDisconnect(reason));
    this.socket.on('connect_error', (_error) => onConnectionError());
    this.socket.on('connect_timeout', (_timeout) => onConnectionError());
  }


  registerChatHandler(onMessageReceived, onKickedReceived) {
    console.log('registerChatHandler');
    this.socket.on('message', onMessageReceived);
    this.socket.on('kick', onKickedReceived);
  }

  unregisterChatHandler() {
    console.log('unregisterChatHandler');
    this.socket.off('message');
    this.socket.off('kick');
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
