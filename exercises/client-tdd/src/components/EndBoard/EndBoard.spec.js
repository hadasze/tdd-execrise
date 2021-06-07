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

describe('end board logic', () => {

    it('should display the name of palyer1 if he won', async () => {
      const winnerX = 'X';
      const { randPlayer1, randPlayer2 } = randPlayersNames();
      const { container } = renderEndBoard(winnerX , randPlayer1, randPlayer2);

      const winner = getWinnerName(container);

      expect(winner.innerHTML).toBe(randPlayer1);
    });

    it('should display the name of palyer2 if he won', async () => {
      const winnerO = 'O';
      const { randPlayer1, randPlayer2 } = randPlayersNames();
      const { container } = renderEndBoard(winnerO, randPlayer1, randPlayer2);

      const winner = getWinnerName(container)

      expect(winner.innerHTML).toBe(randPlayer2);
    });

    it('should not display the name of the winner if no one won yet', async () => {
      const noWinnerSoFar = "";
      const { randPlayer1, randPlayer2 } = randPlayersNames();
      const { container } = renderEndBoard(noWinnerSoFar, randPlayer1, randPlayer2);

      const winner = getWinnerName(container);

      expect(winner.innerHTML).toBe(noWinnerSoFar);
    });

});
