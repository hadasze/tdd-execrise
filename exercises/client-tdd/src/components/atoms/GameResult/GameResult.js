import React from "react";
import PropTypes from 'prop-types'

class GameResult extends React.Component {
  static propTypes = {
    winner: PropTypes.string,
    tie: PropTypes.bool
  }

  render() {
    const {winner, tie} = this.props
    return (
      <React.Fragment>
        {winner && (
          <h3>
            The winner is: <span id="winner">{winner}</span>
          </h3>
        )}

        {tie && <h3 id="tie">This is a Tie !</h3>}
      </React.Fragment>
    )
  }
}

export default GameResult;
