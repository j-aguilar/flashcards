import React, {Component} from 'react';

class Front extends Component {

  render() {
    //console.log(this.props)
    return (
      <div className="flip-card-front" id="front-face">
        <p>{this.props.question}</p>
      </div>
    )
  }
}

export default Front
