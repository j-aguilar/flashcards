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
    this.voices = []
    this.state = {
      qa: {}
    }
    this.getNextQASet = this.getNextQASet.bind(this)
    this.readAload = this.readAload.bind(this)
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

  readAload() {
    const flipped = document.getElementById('flip-card-child-positioner').classList.contains('flipped')
    const side = (flipped)? "answer": "question";
    const text = this.state.qa[side]
    const synth = window.speechSynthesis;
    let utterThis = new SpeechSynthesisUtterance(text)
    utterThis.voice = this.voices[3]
    console.log(utterThis)
    synth.speak(utterThis)
  }

  setSpeech() {
      return new Promise(
          function (resolve, reject) {
              let synth = window.speechSynthesis;
              let id;

              id = setInterval(() => {
                  if (synth.getVoices().length !== 0) {
                      resolve(synth.getVoices());
                      clearInterval(id);
                  }
              }, 10);
          }
      )
  }

  componentDidMount() {
    let s = this.setSpeech();
    s.then((voices) => this.voices = voices);
    data.sort(() => (0.5 - Math.random()) )
    return this.getNextQASet()
  }

  render() {
    return (
      <div className="App">
        <Flex>
          <FlipCard qa={this.state.qa}/>
          <ActionBar getNextQASet={this.getNextQASet} readAload={this.readAload}/>
        </Flex>
      </div>
    );
  }
}

export default App;
