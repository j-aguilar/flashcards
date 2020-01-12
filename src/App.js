import React, {Component}  from 'react';
import './App.css';
import data from './data/data.js'
import Flex from './flex/Flex'
import FlipCard from './flipcard/FlipCard'

class App extends Component {
  constructor() {
    super()
    this.state = {
      qa: {}
    }
    this.getNextQASet = this.getNextQASet.bind(this)
  }

  getNextQASet() {
    return this.setState((prevState) => {
      let qa = {
        question: "There are no more cards to display.",
        answer: "There are no more cards to display."
      }
      if (data.length > 0) qa = data.pop()
      //console.log("hC:qa ", typeof qa, qa)
      return {
        qa: qa
      }
    })
  }

  componentDidMount() {
    return this.getNextQASet()
  }

  render() {
    //console.log(typeof data, data)
    //console.log(this.qa)
    return (
      <div className="App">
        <Flex>
          <FlipCard qa={this.state.qa}/>
          <button onClick={this.getNextQASet}>Next</button>
        </Flex>
      </div>
    );
  }
}

export default App;
