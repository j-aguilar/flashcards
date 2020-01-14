import React, {Component} from 'react';
import './flipcard.css';

const Front = (props) => {
        return (
          <div className="flip-card-front" id="front-face">
            <p>{props.question}</p>
          </div>
        )
      }
const Back = (props) => {
  return (
    <div className="flip-card-back " id="back-face">
      <p>{props.answer}</p>
    </div>
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
