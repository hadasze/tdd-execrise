import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { StartingBoard } from './StartingBoard';

function renderStartingBoard(isGameStarted, player1, player2, currPlayer){
  return render(<StartingBoard
             isGameStarted={isGameStarted}
             player1={player1}
             player2={player2}
             currentPlayer={currPlayer}>
</StartingBoard>);
}

function getPlayer(container) {
  return container.querySelector("#current-player");}

describe('starting board logic', () => {
    it('Should show the current player in bold if game started', async () => {
      const { container } = renderStartingBoard(true, "hadas", "barak", 'X');
      const player = getPlayer(container);
      expect(player.innerHTML).toBe("<b>X</b>");
    });

    it('Should show the current player in bold if game started and switch according to turns', async () => {
      const { container } = renderStartingBoard(true, "hadas", "barak", 'O');
      const player = getPlayer(container);
      expect(player.innerHTML).toBe("<b>O</b>");

    });
});
