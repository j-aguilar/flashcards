import React, {Component}  from 'react';
import './App.css';
import data from './data/data.js'
import Flex from './flex/Flex'
import FlipCard from './flipcard/FlipCard'
import ActionBar from './actionbar/ActionBar'

class App extends Component {
  constructor() {
    super()
    this.cardCount = 0
    this.voices = []
    this.usingAutoPlay = false
    this.state = {
      qa: {}
    }
    this.getNextQASet = this.getNextQASet.bind(this)
    this.flipCard = this.flipCard.bind(this)
    this.readAload = this.readAload.bind(this)
    this.autoPlay = this.autoPlay.bind(this)
    this.toggleAutoPlay = this.toggleAutoPlay.bind(this)
  }

  getNextQASet() {
    return this.setState((prevState) => {
      let qa = {
        question: "There are no more cards to display.",
        answer: "There are no more cards to display."
      }
      if (data.length > 0) qa = data.pop()
      this.cardCount += 1

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

  flipCard() {
    document.getElementById('flip-card-child-positioner').classList.toggle('flipped')
  }

  readAload() {
    const flipped = document.getElementById('flip-card-child-positioner').classList.contains('flipped')
    const side = (flipped)? "answer": "question";
    const text = this.state.qa[side]
    const synth = window.speechSynthesis;
    let utterThis = new SpeechSynthesisUtterance(text)
    utterThis.voice = this.voices[3]
    //console.log(utterThis)
    synth.speak(utterThis)
    if (this.usingAutoPlay) {
      utterThis.onend = (event) => {this.autoPlay(side)}
    }
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

  toggleAutoPlay () {
    this.usingAutoPlay = !this.usingAutoPlay;
    document.getElementById('flip-card-child-positioner').classList.remove('flipped')
    if (this.usingAutoPlay) {
      this.autoPlay("starting")
    }
  }

  autoPlay (phase) {
    console.log(phase, this.cardCount);
    switch (phase) {
      case "starting":
        this.readAload()
        break;
      case "question":
        this.flipCard()
        setTimeout(() => {this.readAload()}, 1500)
        break;
      case "answer":
        this.getNextQASet()
        setTimeout(() => {this.readAload()}, 3500)
        break;
      default:
      // Do nothing

    }

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
          <ActionBar toggleAutoPlay={this.toggleAutoPlay} getNextQASet={this.getNextQASet} flipCard={this.flipCard} readAload={this.readAload}/>
        </Flex>
      </div>
    );
  }
}

export default App;
