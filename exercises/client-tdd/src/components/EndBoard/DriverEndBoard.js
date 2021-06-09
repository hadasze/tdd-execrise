import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { EndBoard } from './EndBoard';

function renderEndBoard(winnerName, player1, player2){
  return render(<EndBoard winner={winnerName} player1={player1} player2={player2}> </EndBoard>);
}

function getWinnerName(container) {
  return container.querySelector("#winner-name");}

function randPlayersNames(){
  var Chance = require('chance');
  var chance = new Chance();
  var randPlayer1 = chance.string();
  var randPlayer2 = chance.string();
  return { randPlayer1, randPlayer2 };
}
