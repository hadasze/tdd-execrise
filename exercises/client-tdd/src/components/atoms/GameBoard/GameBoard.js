import React from "react";
import PropTypes from 'prop-types'
import s from "./GameBoard.scss";

const getCellKey = (rowIndex, colIndex) => `cell-${rowIndex}-${colIndex}`;

class GameBoard extends React.Component {
  static propTypes = {
    board: PropTypes.array,
    isDisabled: PropTypes.bool,
    onCellClicked: PropTypes.func
  }

  handleClickOnCell = (rowIndex, colIndex) => {
    const {isDisabled, onCellClicked, board} = this.props
    const isSpotTaken = !!board[rowIndex][colIndex];

    if (isSpotTaken || isDisabled) return

    onCellClicked(rowIndex, colIndex)
  }

  render() {
    const {board} = this.props
    return (
      <div className={s.container}>
        {board.map((row, rowIndex) => {
          return (
            <div className={s.row} key={rowIndex}>
              {row.map((cellValue, colIndex) => {
                const key = getCellKey(rowIndex, colIndex)
                return (
                  <span
                    className={s.cell}
                    key={key}
                    data-hook={key}
                    onClick={() => this.handleClickOnCell(rowIndex, colIndex)}
                  >
                          {cellValue}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    )
  }
}

export default GameBoard;
