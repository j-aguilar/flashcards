import React from 'react'
import Flex from '../../components/Flex'
import FlipCard from '../../components/FlipCard'
import CardButtonBar from '../../components/CardButtonBar'

export default function Home(props) {
    return (
      <Flex>
        <FlipCard cards={props.cards} fetchCards={props.fetchCards} />
        <CardButtonBar />
      </Flex>
    )
  }
