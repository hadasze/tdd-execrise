import React from "react";
import PropTypes from 'prop-types'

class LeaderBoard extends React.Component {
  static propTypes = {
    leaderBoard: PropTypes.array,
  }

  static defaultProps = {
    leaderBoard: []
  };

  render() {
    const {leaderBoard} = this.props
    return (
      <React.Fragment>
        <h3>Leader Board !</h3>
        <table data-hook="leaderboard">
          <tbody>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {leaderBoard.map((lbRow, index) => {
            const [name, score] = lbRow;
            return (
            <tr key={index}>
            <td>{name}</td>
            <td>{score}</td>
            </tr>
            );
          })}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default LeaderBoard;
