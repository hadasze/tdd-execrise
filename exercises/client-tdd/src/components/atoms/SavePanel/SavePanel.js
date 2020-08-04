import React from "react";
import PropTypes from 'prop-types'

class SavePanel extends React.Component {
  static propTypes = {
    onSave: PropTypes.func,
    onLoad: PropTypes.func
  }

  render() {
    const {onSave, onLoad} = this.props
    return (
      <div>
        <button data-hook="save" onClick={onSave}>
          Save Game
        </button>
        <button data-hook="load" onClick={onLoad}>
          Load Game
        </button>
      </div>
    )
  }
}

export default SavePanel;
