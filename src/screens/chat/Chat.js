import React from 'react';

import './Chat.css';
import Message from '../../components/message/Message';
import Announcment from '../../components/announcment/Announcment';
import ButtonLink from '../../components/form-elements/buttons/ButtonLink';
import ButtonPrimary from '../../components/form-elements/buttons/ButtonPrimary';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      input: '',
    }
    this.chatWindow = React.createRef();
  }

  componentDidMount() {
    this.props.socket.registerChatHandler(
      (message) => { this.handleOnMessageReceive(message) },
      (message) => { this.props.onKick(message) },
    );
  }

  componentWillUnmount() {
    this.props.socket.unregisterChatHandler();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.messages.length > prevState.messages.length) {
      this.chatWindow.current.scrollTop = this.chatWindow.current.scrollHeight;
    }
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value,
    })
  }

  handleOnLeave() {
    this.props.socket.leave();
    this.props.onLeave();
  }

  handleOnPost() {
    if (this.state.input) {
      this.props.socket.message(this.state.input);
      this.setState({
        input: '',
      });
    }
  }

  handleEnterKey(e) {
    if (e.which === 13) {
      this.handleOnPost();
    }
  }

  handleOnMessageReceive(message) {
    const messages = this.state.messages.slice();
    messages.push(message);
    this.setState({ messages });
  }

  handleOnUsersReceive(users) {
    this.setState({ users });
  }

  renderMessages() {
    return this.state.messages.map((message, i) => {
      if (message.isAnnouncment) {
        return (
          <Announcment
            key={`announcment-${i}-${message.timestamp}`}
            text={message.text}
          />
        );
      } else {
        const written = message.nickname === this.props.user.nickname;
        return (
          <Message
            key={`message-${i}-${message.timestamp}`}
            author={message.nickname}
            text={message.text}
            written={written}
          />
        );
      }
    });
  }

  render() {
    return (
      <div className="CHAT__wrapper">
        <div className="text-center">
          <ButtonLink onClick={this.handleOnLeave.bind(this)}> Leave </ButtonLink>
        </div>
        <div className="CHAT__messages" ref={this.chatWindow}>
          { this.renderMessages() }
        </div>
        <div className="input-group CHAT__message-input">
          <input
            value={this.state.input}
            onChange={this.handleInputChange.bind(this)}
            onKeyPress={this.handleEnterKey.bind(this)}
            className="form-control"
          />
          <div className="input-group-append">
            <ButtonPrimary onClick={this.handleOnPost.bind(this)}> Post </ButtonPrimary>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
