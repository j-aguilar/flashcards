import React, {Component}  from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import data from './data/data.js'
import Flex from './flex/Flex'
import FlipCard from './flipcard/FlipCard'
import ActionBar from './actionbar/ActionBar'

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

      document.getElementById('front-face').classList.add('clear')
      document.getElementById('back-face').classList.add('clear')
      document.getElementById('flip-card-child-positioner').classList.remove('flipped')
      setTimeout(() => {
        document.getElementById('front-face').classList.remove('clear')
        document.getElementById('back-face').classList.remove('clear')
      }, 500)
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
          <ActionBar getNextQASet={this.getNextQASet}/>
        </Flex>
      </div>
    );
  }
}

export default App;
