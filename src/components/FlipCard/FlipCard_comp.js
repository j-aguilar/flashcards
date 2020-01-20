import React, {Component} from 'react';
import './flipcard.css';
import { Paper } from '@material-ui/core'

const Front = (props) => {
  return (
    <Paper className="flip-card-front" id="front-face" elevation={3}>{props.question}</Paper>
  )
}
const Back = (props) => {
  return (
    <Paper className="flip-card-back " id="back-face" elevation={3}>{props.answer}</Paper>
  )
}

class FlipCard extends Component {

  render() {
    return(
      <div className="flip-card">
        <div id="flip-card-child-positioner">
          <Front question={this.props.qa.question}/>
          <Back answer={this.props.qa.answer}/>
        </div>
      </div>
    )
  }
}

export default FlipCard
