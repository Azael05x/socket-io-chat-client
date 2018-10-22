import React from 'react';

import './Landing.css';
import ButtonPrimary from '../../components/form-elements/buttons/ButtonPrimary';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      error: props.serverFlashMessage || '',
    }
  }

  componentDidMount() {
    this.props.socket.registerLandingHandler(
      this.props.onLogin.bind(this),
      (error) => this.setState({ error })
    );
  }

  componentWillUnmount() {
    this.props.socket.unregisterLandingHandler();
  }

  handleInputChange(e) {
    this.setState({
      nickname: e.target.value,
    });
  }

  handleLoginButton() {
    if (this.state.nickname.length > 0 && this.state.nickname.length < 25) {
      this.props.socket.join(this.state.nickname);
    } else {
      this.setState({
        error: 'Please provide nickname that is shorter than 25 characters',
      })
    }
  }

  handleEnterKey(e) {
    if (e.which === 13) {
      this.handleLoginButton();
    }
  }

  render() {
    return (
      <div className="LANDING__wrapper">
        <h1 className="text-center mb-0"> Yet another chat room </h1>
        <div className="input-group LANDING__nickname-input mx-auto mt-4">
          <input
            type="text" className="form-control" placeholder="Nickname"
            value={this.state.nickname}
            onChange={this.handleInputChange.bind(this)}
            onKeyPress={this.handleEnterKey.bind(this)}
          />
          <div className="input-group-append">
            <ButtonPrimary onClick={this.handleLoginButton.bind(this)}> Login </ButtonPrimary>
          </div>
        </div>
        <p className="text-muted text-center mt-2">{this.state.error}</p>
      </div>
    );
  }
}

export default Landing;
