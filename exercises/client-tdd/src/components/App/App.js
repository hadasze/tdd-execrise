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
  };

  handleCellClick = (rowIndex, colIndex) => {
    const board = _.cloneDeep(this.state.board);
    board[rowIndex][colIndex] = this.state.currentPlayer;
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    const winner = getWinner(board);
    this.setState({ board, currentPlayer: nextPlayer, winner });
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

        <h3>
          <span>Game is on!</span>
          <span id="player-1-title">
            {this.state.isGameStarted && this.state.player1}
          </span>
          <span>VS.</span>
          <span id="player-2-title">
            {this.state.isGameStarted && this.state.player2}
          </span>
        </h3>

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

        <h3>
          The winner is: <span id="winner">{this.state.winner}</span>
        </h3>
      </div>
    );
  }
}

export default translate()(App);