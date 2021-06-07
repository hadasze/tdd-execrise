import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { StartingBoard } from './StartingBoard';

function renderStartingBoard(player1, player2, currPlayer){
  const isGameStarted = true;
  return render(<StartingBoard
             isGameStarted={isGameStarted}
             player1={player1}
             player2={player2}
             currentPlayer={currPlayer}>
</StartingBoard>);
}

function getPlayer(container) {
  return container.querySelector("#current-player");
}

function randPlayersNames(){
    var Chance = require('chance');
    var chance = new Chance();
    var randPlayer1 = chance.string();
    var randPlayer2 = chance.string();
    return { randPlayer1, randPlayer2 };
  }

describe('starting board logic', () => {
    it('Should show the current player in bold if game started', async () => {
      const currPlayer = 'X';
      const { randPlayer1, randPlayer2 } = randPlayersNames();
      const { container } = renderStartingBoard(randPlayer1, randPlayer2, currPlayer);

      const player = getPlayer(container);

      expect(player.innerHTML).toBe("<b>X</b>");
    });

    it('Should show the current player in bold if game started and switch according to turns', async () => {
      const currPlayer = 'O';
      const { randPlayer1, randPlayer2 } = randPlayersNames();
      const { container } = renderStartingBoard(randPlayer1, randPlayer2, currPlayer);

      const player = getPlayer(container);

      expect(player.innerHTML).toBe("<b>O</b>");
    });
});
