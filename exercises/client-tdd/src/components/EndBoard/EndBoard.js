

import React from 'react'

export const EndBoard = (props) => {
  return (
  <div>
    <h3>
    <p>The winner is: <span id="winner">{props.winner}</span></p>
      congrats to <span id="winner-name">{props.winner!=='' ? (props.winner === 'X' ? props.player1 : props.player2) : ""}</span>
    </h3>
  </div>);
}
