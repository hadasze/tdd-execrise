import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import s from './App.scss';
import _ from 'lodash';
import Register from '../Register/Register';
import { getWinner, hasEmptyCells } from '../../gameLogic';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  state = {
    player1: '',
    player2: '',
    isGameStarted: false,
    isGameEnded: false,
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: 'X',
    winner: '',
  };

  handleCellClick = (rowIndex, colIndex) => {
    if (this.state.board[rowIndex][colIndex] === '') {
      const board = _.cloneDeep(this.state.board);
      board[rowIndex][colIndex] = this.state.currentPlayer;
      const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
      const winner = getWinner(board);
      const isGameEnded = !!winner || !hasEmptyCells(board)

      this.setState({
        board,
        winner,
        isGameEnded,
        currentPlayer: nextPlayer
      });
    }
  };

   getWinnerName = () => {
    switch (this.state.winner) {
      case 'X': return this.state.player1;
      case 'O': return this.state.player2;
      default:  return '';
    }
  }

  getStatus = () => {
    if (!this.state.isGameEnded) {
      return <></>
    }
    if (this.state.winner === '') {
      return <>Round draw</>
    } else {
      return <>The winner is: <span id="winner">{this.getWinnerName()}</span></>;
    }
  }

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
          <span
            id="player-1-title"
            className={this.state.currentPlayer === 'X' ? s.active : ''}
            data-testid="player-1-title"
          >
            {this.state.isGameStarted && this.state.player1}
          </span>
          <span>VS.</span>
          <span
            id="player-2-title"
            className={this.state.currentPlayer === 'O' ? s.active : ''}
            data-testid="player-2-title"
          >
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
                      data-testid={key}
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
        <h3 id="game-status">
          {this.getStatus()}
        </h3>
      </div>
    );
  }
}

export default translate()(App);
