import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Flex from './../../components/Flex'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 200,
  }
}));

function NoCards() {
  return <ListItem><ListItemText primary="No cards..." /></ListItem>
}


export default function Category (props) {
  const { id } = useParams();
  useEffect(() => {
    props.fetchCards(id)
  }, [])

  console.log(props)
  const classes = useStyles();
  const CardList = () => {
    let component = ''
    switch (props.cards.length) {
      case 0:
        component = <NoCards />
        break;
      default:
        component = props.cards.map( card => {
          return <ListItem key={card.key}> <ListItemText primary={card.doc.question} /> </ListItem>
        })
      break;
    }
    return component
  }

  return (
    <div>
      <h3>ID: {id}</h3>
        <Flex>
          <div className={classes.root}>
            <List>
              <CardList />
            </List>
          </div>
        </Flex>
    </div>
  )
}
