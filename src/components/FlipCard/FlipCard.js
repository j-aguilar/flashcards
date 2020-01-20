import React, {useState, useEffect} from 'react';
import './flipcard.css';
import { Paper } from '@material-ui/core'
import { useParams } from "react-router-dom";

const Front = (props) => {
  return (
    <Paper className="flip-card-front" id="front-face" elevation={3}>{props.question}</Paper>
  )
}
const Back = (props) => {
  return (
    <Paper className="flip-card-back " id="back-face" elevation={3}>{props.answer}</Paper>
  )
}

export default function FlipCard (props) {
  const id = "category_JavaScript_Interview_Questions"
  const [iterator, setIterator] = useState(0)
  useEffect(() => {
    console.log(props)
    console.log(id)
    props.fetchCards(id)
  }, [])

  return(
    <div className="flip-card">
      <div id="flip-card-child-positioner">
        <Front question={props.card.question}/>
        <Back answer={props.card.answer}/>
      </div>
    </div>
  )
}
