import React, {Component}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faExchangeAlt, faVolumeUp, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

class ActionBar extends Component {
  render(){
    return (
      <div>
        <button onClick={this.props.toggleAutoPlay}><FontAwesomeIcon icon={faSyncAlt} /> Auto Play</button>
        <button onClick={this.props.flipCard}><FontAwesomeIcon icon={faExchangeAlt} /> Flip</button>
        <button onClick={this.props.readAload}><FontAwesomeIcon icon={faVolumeUp} /> Listen</button>
        <button onClick={this.props.getNextQASet}><FontAwesomeIcon icon={faLongArrowAltRight} /> Next</button>
      </div>
    )
  }
}

export default ActionBar
