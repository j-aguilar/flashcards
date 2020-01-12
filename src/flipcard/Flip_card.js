import React, {Component} from 'react';
import Front from './Front';
import Back from './Back';
import './flipcard.css';

class FlipCard extends Component {
  render() {
    return(
      <div className="flip-card">
        <div className="flip-card-child-positioner">
          <Front />
          <Back />
        </div>
      </div>
    )
  }
}

export default FlipCard
