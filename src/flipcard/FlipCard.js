import React, {Component} from 'react';
import Front from './Front';
import Back from './Back';
import './flipcard.css';

class FlipCard extends Component {
  componentDidUpdate() {

  }

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
