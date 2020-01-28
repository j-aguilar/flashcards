import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import {List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Button, IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {Flex, BottomAppBar, CardForm} from '../_components'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 200,
    overflow: 'auto'
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

  // console.log(props)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const setters = {
    set_question: setQuestion,
    set_answer: setAnswer
  }

  const fabActions = {
    handleOpen() {
      setOpen(true);
    },
    handleClose() {
      setOpen(false);
    },
    handleChange(event) {
      setters[`set_${event.target.name}`](event.target.value);
    },
    handleSubmit(event) {
      event.preventDefault()
      // console.log("submitted")
      props.addCard({question: question, answer: answer, category: id})
      fabActions.handleClose()
      setQuestion('')
      setAnswer('')
    }
  }


  const CardList = () => {
    let component = ''
    switch (props.cards.length) {
      case 0:
        component = <NoCards />
        break;
      default:
        component = props.cards.map( card => {
          return (
            <ListItem key={card.key}>
              <ListItemText primary={card.doc.question} secondary={card.doc.answer} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
          )
        })
      break;
    }
    return component
  }

  return (
    <React.Fragment>
      <Flex>
        <div className={classes.root}>
          <List>
            <CardList />
          </List>
        </div>
      </Flex>
      <CardForm fabActions={fabActions} open={open} question={question} answer={answer} />
      <BottomAppBar useFab={true} handleOpen={fabActions.handleOpen}/>
    </React.Fragment>
  )
}
