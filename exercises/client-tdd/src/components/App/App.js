import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import s from './App.scss';
import _ from 'lodash';
import Register from '../Register/Register';
import { getWinner } from '../../gameLogic';
import { StartingBoard } from '../StartingBoard/StartingBoard';
import { Board } from "../Board/Board"
import { EndBoard } from "../EndBoard/EndBoard"

export class App extends React.Component {
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
    if(board[rowIndex][colIndex] === ''){
    board[rowIndex][colIndex] = this.state.currentPlayer;
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    const winner = getWinner(board);
    this.setState({ board, currentPlayer: nextPlayer, winner });
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

        <StartingBoard isGameStarted={this.state.isGameStarted} player1={this.state.player1} player2={this.state.player2} currentPlayer={this.state.currentPlayer}/>

        <Board board={this.state.board} cell={s.cell} handleCellClick={this.handleCellClick}> </Board>

        <EndBoard winner={this.state.winner} player1={this.state.player1} player2={this.state.player2}> </EndBoard>

      </div>
    );
  }
}

export default translate()(App);
