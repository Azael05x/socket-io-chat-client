import React from 'react';

import './App.css';
import Chat from './screens/chat/Chat';
import Landing from './screens/landing/Landing';
import Socket from './socket';
import Connection from './components/connection/Connection';

class App extends React.Component {
  constructor(props) {
    super(props);

    const socket = new Socket(
      this.handleOnConnect.bind(this),
      this.handleOnConnectionError.bind(this),
      this.handleOnDisconnect.bind(this)
    );
    this.state = {
      socket,
      socketStatus: false,
      isLoggedIn: false,
      user: {},
      serverFlashMessage: '',
    };
  }

  handleSuccessfulChatLogin(user) {
    this.setState({
      user,
      isLoggedIn: true,
      serverFlashMessage: '',
    });
  }

  handleLeave() {
    this.setState({
      isLoggedIn: false,
      user: {},
      serverFlashMessage: '',
    });
  }

  handleKicked(message) {
    this.setState({
      user: {},
      isLoggedIn: false,
      serverFlashMessage: message,
    });
  }

  handleOnConnect() {
    this.setState({
      socketStatus: true,
    });
  }

  handleOnConnectionError() {
    this.setState({
      socketStatus: false,
    });
  }

  handleOnDisconnect(reason) {
    if (reason === 'io server disconnect') {
      this.state.socket.socket.connect();
      this.setState({
        socketStatus: false,
        isLoggedIn: false,
        user: {},
        serverFlashMessage: 'Server unavailable',
      });
    }
  }

  isLoggedIn() {
    return this.state.isLoggedIn;
  }

  renderLandingScreen() {
    return (
      <Landing
        socket={this.state.socket}
        serverFlashMessage={this.state.serverFlashMessage}
        onLogin={this.handleSuccessfulChatLogin.bind(this)}
      />
    )
  }

  renderChatScreen() {
    return (
      <Chat
        socket={this.state.socket}
        user={this.state.user}
        serverFlashMessage={this.state.serverFlashMessage}
        onLogin={this.handleSuccessfulChatLogin.bind(this)}
        onLeave={this.handleLeave.bind(this)}
        onKick={this.handleKicked.bind(this)}
      />
    )
  }

  render() {
    return (
      <div className="App">
        <Connection connected={this.state.socketStatus} />
        { this.isLoggedIn() ? this.renderChatScreen() : this.renderLandingScreen() }
      </div>
    );
  }
}

export default App;
