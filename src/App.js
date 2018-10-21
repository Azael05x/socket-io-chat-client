import React from 'react';

import './App.css';
import Chat from './screens/chat/Chat';
import Landing from './screens/landing/Landing';
import Socket from './socket';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: new Socket(),
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
        { this.isLoggedIn() ? this.renderChatScreen() : this.renderLandingScreen() }
      </div>
    );
  }
}

export default App;
