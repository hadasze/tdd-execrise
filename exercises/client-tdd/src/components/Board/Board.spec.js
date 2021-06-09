import { render, fireEvent } from '@testing-library/react'
import { App } from '../App/App';
import { Board } from './Board';
import React from 'react'

function renderBoard(board, handleCellClick){
  const randomCellCSS = 's';
  return render(<Board board={board} handleCellClick={handleCellClick} cell={randomCellCSS}></Board>);
}

function getCell(container, rowIndex, colIndex) {
  return container.querySelector(`[data-hook="cell-${rowIndex}-${colIndex}"]`);
}

function generateClearBoard(){
  return [['', '', ''],
          ['', '', ''],
          ['', '', '']];
}

function randCell(){
  var Chance = require('chance');
  var chance = new Chance();
  var randRowIndex = chance.integer({ min: 0, max: 2 });
  var randColIndex = chance.integer({ min: 0, max: 2 });
  return { randRowIndex, randColIndex };
}

function playAMove(container){
  const { randRowIndex, randColIndex } = randCell();
  const cell = getCell(container, randRowIndex, randColIndex);
  fireEvent.click(cell);
  return { randRowIndex, randColIndex };
}

function playDoubleMove(container){
  const { randRowIndex, randColIndex } = randCell();
  const cell = getCell(container, randRowIndex, randColIndex);
  fireEvent.click(cell);
}


describe("handle Cell Click - handling valid click", () => {
  it('Should let click on a fresh cell', async () => {
      const spy = jest.fn();
      const board = generateClearBoard();
      const { container } = renderBoard(board, spy);

      const { randRowIndex, randColIndex } = playAMove(container);

      expect(spy).toHaveBeenCalledWith(randRowIndex, randColIndex);
    });

    it('Should not Let click twice on a pressed cell', async () => {
      const spy = jest.fn();
      const board = generateClearBoard();
      const { container } = renderBoard(board, spy);

     playDoubleMove(container);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });


