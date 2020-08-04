import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import s from './App.scss';
import _ from 'lodash';
import Register from '../Register/Register';
import { getWinner } from '../../gameLogic';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  state = {
    player1: '',
    player2: '',
    isGameStarted: false,
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: 'X',
    winner: '',
    winners: {},
  };

  handleCellClick = (rowIndex, colIndex) => {
    if (this.state.board[rowIndex][colIndex] || this.state.winner) return;
    const board = _.cloneDeep(this.state.board);
    board[rowIndex][colIndex] = this.state.currentPlayer;
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    const winner = getWinner(board, this.state.currentPlayer);
    this.setState({ board, currentPlayer: nextPlayer, winner });
    this.updateWinners(winner);
  };

  nameInBold = (toBold) => {
    return toBold ? { fontWeight: '900', color: 'red' } : {};
  };

  shouldDisplayNames = () => {
    if (this.state.isGameStarted) {
      return (
        <h3>
          <span>Game is on!</span>
          <br></br>
          <span
            id="player-1-title"
            style={this.nameInBold(this.state.currentPlayer === 'X')}
          >
            {this.state.player1}
          </span>
          <span>VS.</span>
          <span
            id="player-2-title"
            style={this.nameInBold(this.state.currentPlayer === 'O')}
          >
            {this.state.player2}
          </span>
        </h3>
      );
    }
    return null;
  };

  getWinnerName = () => {
    return this.state.currentPlayer === 'X'
      ? this.state.player1
      : this.state.player2;
  };

  updateWinners = (winnerName) => {
    const updatedWinners = {
      ...this.state.winners,
      winnerName: this.state.winners[winnerName] + 1 || 1,
    };
    this.setState({ winners: updatedWinners });
  };

  declareWinner = () => {
    if (this.state.winner === 'Tie') {
      return <span id="tie">Its a tie!</span>;
    } else if (this.state.winner) {
      const winnerName = this.getWinnerName();
      return (
        <h3>
          The winner is: <span id="winner">{this.state.winner}</span>
          <span id="winner-name">Congratsulations {winnerName}</span>
        </h3>
      );
    }
  };

  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <h2 className={s.title} data-testid="app-title">
          {t('app.title')}
        </h2>

        <Register
          onStart={(player1, player2) => {
            this.setState({ player1, player2, isGameStarted: true });
          }}
        />

        {this.shouldDisplayNames()}

        <div>
          {this.state.board.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((cellValue, colIndex) => {
                  const key = `cell-${rowIndex}-${colIndex}`;
                  return (
                    <span
                      className={s.cell}
                      key={key}
                      data-hook={key}
                      onClick={() => this.handleCellClick(rowIndex, colIndex)}
                    >
                      {cellValue}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>

        {this.declareWinner()}
      </div>
    );
  }
}

export default translate()(App);
