import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { EndBoard } from './EndBoard';

function renderEndBoard(winnerName, player1, player2){
  return render(<EndBoard winner={winnerName} player1={player1} player2={player2}> </EndBoard>);
}

function getWinnerName(container) {
  return container.querySelector("#winner-name");}


describe('end board logic', () => {
    it('should not display the name of the winner if no one won yet', async () => {
      const { container } = renderEndBoard("", "hadas", "barak");
      const winner = getWinnerName(container);
      expect(winner.innerHTML).toBe("");
    });

    it('should display the name of palyer1 if he won', async () => {
      const { container } = renderEndBoard("X", "hadas", "barak");
      const winner = getWinnerName(container);
      expect(winner.innerHTML).toBe("hadas");
    });

    it('should display the name of palyer2 if he won', async () => {
      const { container } = renderEndBoard("O", "hadas", "barak");
      const winner = getWinnerName(container)
      expect(winner.innerHTML).toBe("barak");
    });

});
