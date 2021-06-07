import { render, fireEvent } from '@testing-library/react'
import { App } from '../App/App';
import { Board } from './Board';
import React from 'react'

function renderBoard(board, handleCellClick, cell){
  return render(<Board board={board} handleCellClick={handleCellClick} cell={cell}></Board>);
}

function getCell(container, rowIndex, colIndex) {
  return container.querySelector(`[data-hook="cell-${rowIndex}-${colIndex}"]`);}

describe('Border logic', () => {
  describe("handle Cell Click - handling valid click", () => {
    it('Should let X click on a fresh cell', async () => {
      const spy = jest.fn();
      const board = [['', '', ''],
                      ['', '', ''],
                      ['', '', '']];
      const { container } = renderBoard(board, spy, 's.cell');
      const rowIndex = 0;
      const colIndex = 0;
      const cell = getCell(container, rowIndex, colIndex);
      fireEvent.click(cell);
      expect(spy).toHaveBeenCalledWith(rowIndex, colIndex);
    });

  })
    describe("handle Cell Click - can not click twice on the same cell", () => {
    it('Should not Let O click twice on a pressed cell', async () => {
      const spy = jest.fn();
      const board = [['', '', ''],
                      ['', '', ''],
                      ['', '', '']];
      const { container, debug } = renderBoard(board, spy, 's.cell');
      const rowIndex = 0;
      const colIndex = 0;
      const cell = getCell(container, rowIndex, colIndex);
      fireEvent.click(cell);
      expect(spy).toHaveBeenCalledWith(rowIndex, colIndex);
    });

    it('Should not Let X click twice on a pressed cell', async () => {
      const spy = jest.fn();

      const board = [['O', '', ''],
                      ['', '', ''],
                      ['', '', '']];

      const { container, debug } = renderBoard(board, spy, 's.cell');
      const rowIndex = 0;
      const colIndex = 0;
      const cell = getCell(container, rowIndex, colIndex);
      fireEvent.click(cell);
      expect(spy).not.toHaveBeenCalledWith();
    });

    it('Should not Let click twice on the same cell', async () => {
      const spy = jest.fn();

      const board = [['', '', ''],
                      ['', '', ''],
                      ['', '', '']];

      const { container, debug } = renderBoard(board, spy, 's.cell');
      const rowIndex = 0;
      const colIndex = 0;
      const cell = getCell(container, rowIndex, colIndex);
      fireEvent.click(cell);
      expect(spy).toHaveBeenCalledWith(rowIndex, colIndex);
      fireEvent.click(cell);
      expect(spy).not.toHaveBeenCalledWith();
    });
  });
});


