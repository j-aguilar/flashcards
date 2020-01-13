import React, {Component}  from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faExchangeAlt, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

class ActionBar extends Component {
  constructor(){
    super()
    this.flipCard = this.flipCard.bind(this)
  }

  flipCard() {
    document.getElementById('flip-card-child-positioner').classList.toggle('flipped')
  }

  render(){
    return (
      <div>
        <button onClick={this.flipCard}><FontAwesomeIcon icon={faExchangeAlt} />Flip</button>
        <button onClick={this.props.readAload}><FontAwesomeIcon icon={faVolumeUp} />Listen</button>
        <button onClick={this.props.getNextQASet}><FontAwesomeIcon icon={faLongArrowAltRight} />Next</button>
      </div>
    )
  }
}

export default ActionBar
