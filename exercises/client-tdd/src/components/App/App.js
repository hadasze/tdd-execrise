import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import s from './App.scss';
import _ from 'lodash';
import Register from '../atoms/Register/Register';
import {getWinner} from '../../utils/gameLogic/gameLogic';
import axios from 'axios';
import LeaderBoard from "../atoms/LeaderBoard/LeaderBoard";
import GameResult from "../atoms/GameResult/GameResult";
import SavePanel from "../atoms/SavePanel/SavePanel";
import GameBoard from "../atoms/GameBoard/GameBoard";
import PlayersPanel from "../atoms/PlayersPanel/PlayersPanel";

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  state = {
    player1: '',
    player2: '',
    isGameActive: false,
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: undefined,
    winner: '',
    steps: 9,
    playersMap: undefined,
    leaderBoard: [],
  };

  componentDidMount() {
    // Open handle (no await), because I don't care when it's resolved.
    this.getLeaderBoard();
  }

  handleCellClick = (rowIndex, colIndex) => {
    const { board, currentPlayer, playersMap, player1, player2 } = this.state;

    const newBoard = _.cloneDeep(board);
    newBoard[rowIndex][colIndex] = playersMap[currentPlayer];
    const winnerMark = getWinner(newBoard);
    const winner = playersMap[winnerMark];
    if (winner) {
      this.playerWonSideEffect(winner);
    }

    const stepsLeft = this.state.steps - 1;
    const isGameActive = !winner && stepsLeft;
    const tie = !winner && !stepsLeft;
    let nextPlayer = currentPlayer;

    // If game continues, switch..
    if (isGameActive) {
      nextPlayer = currentPlayer === player1 ? player2 : player1;
    }

    this.setState({
      board: newBoard,
      steps: stepsLeft,
      currentPlayer: nextPlayer,
      isGameActive,
      winner,
      tie,
    });
  };

  async playerWonSideEffect(winner) {
    const {data: leaderBoard} = await axios.post('/api/leaderboard', {
      winner,
    });
    this.setState({leaderBoard});
  }

  async getLeaderBoard() {
    const {data: leaderBoard} = await axios.get('/api/leaderboard');
    this.setState({leaderBoard});
  }

  initGame = ({player1, player2, game}) => {
    if (game) {
      return this.setState(game);
    }

    const playersMap = {
      [player1]: 'X',
      X: player1,
      [player2]: 'O',
      O: player2,
    };
    this.setState({player1, player2, currentPlayer: player1, isGameActive: true, playersMap});
  };



  handleLoad = async () => {
    const {data: game} = await axios.get('/api/game');
    this.initGame({game});
  };

  handleSave = async () => {
    const {
      player1,
      player2,
      isGameActive,
      board,
      currentPlayer,
      winner,
      steps,
      playersMap,
    } = this.state;

    await axios.post('/api/game', {
      player1,
      player2,
      isGameActive,
      board,
      currentPlayer,
      winner,
      steps,
      playersMap,
    });
  };

  render() {
    const {t} = this.props;
    const {isGameActive, player1, player2, board, winner, tie, leaderBoard, currentPlayer} = this.state;

    return (
      <div className={s.root}>
        <h2 data-testid="app-title">
          {t('app.title')}
        </h2>

        {!player1 && (
          <Register
            onStart={(p1, p2) => this.initGame({player1: p1, player2: p2})}
          />
        )}

        {player1 && (
          <div>
            <h3>Game is on!</h3>
            <PlayersPanel player1={player1} player2={player2} currentPlayer={currentPlayer}/>
            <GameBoard isDisabled={!isGameActive} board={board} onCellClicked={this.handleCellClick}/>
          </div>
        )}

        <SavePanel onSave={this.handleSave} onLoad={this.handleLoad}/>
        <GameResult winner={winner} tie={tie}/>
        <LeaderBoard leaderBoard={leaderBoard}/>
      </div>
    );
  }
}

export default translate()(App);
