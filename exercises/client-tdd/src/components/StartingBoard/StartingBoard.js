import React from 'react'

export const StartingBoard = (props) => {
  return (
  <div>
    <h3>
    <span>Game is on!</span>
    <span id="player-1-title">
      {props.isGameStarted && props.player1}
    </span>
    <span>VS.</span>
    <span id="player-2-title">
    {props.isGameStarted && props.player2}
    </span>
    </h3>

    <span>Current player is:</span>
    {props.isGameStarted ? <span id="current-player"><b>{props.currentPlayer}</b></span> : "game isn't started yet..." }
  </div>);
}



