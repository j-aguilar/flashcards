import React, {Component} from 'react';
import './flex.css';

class Flex extends Component {
  render() {
    return(
      <div className="flex-container">
        {this.props.children}
      </div>
    )
  }
}

export default Flex
