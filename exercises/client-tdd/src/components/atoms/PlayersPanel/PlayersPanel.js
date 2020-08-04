import React from "react";
import PropTypes from 'prop-types'
import s from "./PlayersPanel.scss";

class PlayersPanel extends React.Component {
  static propTypes = {
    player1: PropTypes.string,
    player2: PropTypes.string,
    currentPlayer: PropTypes.string,
  }

  isActive = (player) => {
    return player === this.props.currentPlayer;
  };

  render() {
    const {player1, player2} = this.props
    return (
        <div className={s.playersNames}>
                <span
                  id="player-1-title"
                  className={this.isActive(player1) ? s.active : ''}
                >
                  {player1}
                </span>
          <span className={s.vs}>VS.</span>
          <span
            id="player-2-title"
            className={this.isActive(player2) ? s.active : ''}
          >
                  {player2}
                </span>
        </div>
    )
  }
}

export default PlayersPanel;
