import React from 'react';
import PropTypes from 'prop-types';
import s from './Register.scss';

export default class Register extends React.Component {
  state = {
    player1: '',
    player2: '',
  };

  validate(value) {
    return /^[A-Za-z]{2,20}$/.test(value);
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          id="player-1-input"
          value={this.state.player1}
          onChange={e => this.setState({ player1: e.target.value })}
          placeholder="Player 1 Name"
          className={this.validate(this.state.player1) ? '' : s.invalid}
        />
        <input
          type="text"
          id="player-2-input"
          value={this.state.player2}
          onChange={e => this.setState({ player2: e.target.value })}
          placeholder="Player 2 Name"
          className={this.validate(this.state.player2) ? '' : s.invalid}
        />

        <button
          id="start-game"
          onClick={() => {
            if (
              this.validate(this.state.player1) &&
              this.validate(this.state.player2)
            ) {
              this.props.onStart(this.state.player1, this.state.player2)
            }
          }}
        >
          Start game
        </button>
      </React.Fragment>
    );
  }
}

Register.displayName = 'Register';
Register.propTypes = {
  onStart: PropTypes.func.isRequired,
};
