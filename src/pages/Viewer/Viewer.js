import React, {Component} from 'react'
import { withRouter } from "react-router";
import { Flex, FlipCard, CardButtonBar, BottomAppBar} from '../_components'

class Viewer extends Component {
  constructor() {
    super()
    const noCards = {
      doc: {
        question: "There are no more cards to display.",
        answer: "There are no more cards to display."
      }
    },
    that = this
    this.iterator = -1
    this.voices = []
    this.usingAutoPlay = false
    this.state = {
      cards: [],
      qa: {
        doc: {
          question: "Loading...",
          answer: "Loading..."
        }
      }
    }

    this.getNextQASet = () => {
      return this.setState((prevState) => {
        const d = document, byId = 'getElementById',
              textMask = (side, modifier) => {d[byId](`${side}-face`).classList[modifier]('clear')}
        let qa = noCards
        this.iterator -= 1; /*semicolonl required here: auto semicolon insertion misses it*/
        ['front', 'back'].forEach(s => {textMask(s, 'add')})
        document.getElementById('flip-card-child-positioner').classList.remove('flipped')
        setTimeout(() => { ['front', 'back'].forEach(s => {textMask(s, 'remove')}) }, 500)
        if (this.iterator > -1) qa = this.state.cards[this.iterator]
        return {
          qa: qa
        }
      })
    }

    this.readAload = () => {
      const flipped = document.getElementById('flip-card-child-positioner').classList.contains('flipped'),
            side = (flipped)? "answer": "question",
            text = this.state.qa.doc[side],
            shouldChunk = function () { return !!text.match(/\t/g) },
            setChunks = function () { return text.split('\t') },
            synth = window.speechSynthesis,
            that = this
      let input = ( shouldChunk() )? setChunks() : text

      function read () {
        let tx = (input instanceof Array && input.length > 0)? input.shift() : input,
            utterThis = new SpeechSynthesisUtterance(tx)
        utterThis.voice = that.voices[3]
        if (input instanceof Array && input.length > 0) {
          utterThis.onend = (event) => {read()}
        } else if (that.usingAutoPlay) {
          utterThis.onend = (event) => {that.autoPlay(side)}
        }
        synth.speak(utterThis)
      }
      read()
    }

    this.autoPlay = (phase) => {
      switch (phase) {
        case "starting":
          this.readAload();
        break;
        case "question":
          this.flipCard();
          setTimeout(() => {this.readAload()}, 1500)
          break;
        case "answer":
          this.getNextQASet()
          setTimeout(() => {this.readAload()}, 3500)
          break;
      }
    }

    this.toggleAutoPlay = () => {
      this.usingAutoPlay = !this.usingAutoPlay;
      document.getElementById('flip-card-child-positioner').classList.remove('flipped')
      if (this.usingAutoPlay) this.autoPlay("starting")
    }

    this.setSpeech = () => {
      return new Promise(function (resolve, reject) {
        let synth = window.speechSynthesis,
            id = setInterval(() => { if (synth.getVoices().length !== 0) {
              clearInterval(id);
              resolve(synth.getVoices());
            } }, 10);
      })
    }

    this.flipCard = () => {
      document.getElementById('flip-card-child-positioner').classList.toggle('flipped')
    }
    /* bind all object methods to the 'this' property*/
    Object.getOwnPropertyNames(that).filter(p => typeof that[p] === 'function').forEach(m => {that[m] = that[m].bind(that)})
  } /* constructor */

  async componentDidMount() {
    // console.log(this.props)
    const id = this.props.match.params.id
    await this.props.fetchCards(id)
    let cards = [...this.props.cards].sort(() => (0.5 - Math.random()) )
    let s = this.setSpeech().then((voices) => this.voices = voices);
    this.setState((prevState) => {return {cards: cards}})
    this.iterator = this.state.cards.length
    this.getNextQASet()
  }

  render () {
    return (
      <React.Fragment>
        <Flex>
          <FlipCard card={this.state.qa.doc} fetchCards={this.props.fetchCards}/>
          <CardButtonBar toggleAutoPlay={this.toggleAutoPlay} getNextQASet={this.getNextQASet} flipCard={this.flipCard} readAload={this.readAload}/>
        </Flex>
        <BottomAppBar useFab={false} />
      </React.Fragment>
    )
  }
}

export default withRouter(Viewer)
