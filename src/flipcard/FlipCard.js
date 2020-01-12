import React, {Component} from 'react';
import Front from './Front';
import Back from './Back';
import './flipcard.css';

class FlipCard extends Component {
  render() {
    return(
      <div className="flip-card">
        <div className="flip-card-child-positioner">
          <Front question={this.props.qa.question}/>
          <Back answer={this.props.qa.answer}/>
        </div>
      </div>
    )
  }
}

export default FlipCard
