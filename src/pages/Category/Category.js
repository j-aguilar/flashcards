import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import {List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Button, IconButton, Popover} from '@material-ui/core';
import {Edit as EditIcon, MoreVert as MoreVertIcon, Delete as DeleteIcon} from '@material-ui/icons';
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
  const [bTxt, setBTxt] = React.useState('Add')
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [editing, setEditing] = React.useState(null)
  const [deleting, setDeleting] = React.useState(null)
  const setters = {
    set_question: setQuestion,
    set_answer: setAnswer
  }

  const actions = {
    handleOpen() {
      setOpen(true);
    },
    handleClose() {
      setOpen(false);
    },
    handleChange(event) {
      setters[`set_${event.target.name}`](event.target.value);
    },
    handleCancel() {
      actions.handleClose()
      setQuestion('')
      setAnswer('')
      setEditing(null)
      setDeleting(null)

    },
    handleSubmit(event) {
      event.preventDefault()
      if (!!editing) {
        props.updateCard({...editing, question: question, answer: answer})
      } else if (!!deleting) {
        props.deleteCard({...deleting})
      } else {
        props.addCard({question: question, answer: answer, category: id})
      }
      actions.handleClose()
      setQuestion('')
      setAnswer('')
    }
  }

  async function handleEdit(event) {
    !!deleting && setDeleting(null)
    setEditing(cardFeildsPopulator(await props.getCard(event.currentTarget.id)))
    actions.handleOpen()
  }

  async function handleDelete(event) {
    !!editing && setEditing(null)
    setDeleting(cardFeildsPopulator(await props.getCard(event.currentTarget.id)))
    actions.handleOpen()
  }

  function cardFeildsPopulator(card) {
    setQuestion(card.question)
    setAnswer(card.answer)
    return card
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
                  <IconButton edge="end" aria-label="edit" onClick={handleEdit} id={card.id}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={handleDelete} id={card.id}>
                    <DeleteIcon />
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
      <CardForm actions={actions} open={open} question={question} answer={answer} editing={!!editing} deleting={!!deleting}/>
      <BottomAppBar useFab={true} handleOpen={actions.handleOpen}/>
    </React.Fragment>
  )
}
