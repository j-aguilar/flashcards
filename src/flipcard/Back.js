import React, {Component} from 'react';

class Back extends Component {
  render() {
    return (
      <div className="flip-card-back">
        <p>{this.props.answer}</p>
      </div>
    )
  }
}

export default Back
