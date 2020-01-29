import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
}));

export default function CategoryForm(props) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.actions.handleClose}
    >
      <div className={classes.modal}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={props.actions.handleSubmit}>
          <TextField multiline placeholder="Question" fullWidth label="Question" name="question"
             value={props.question} onChange={props.actions.handleChange} autoFocus required />
          <TextField multiline placeholder="Answer" fullWidth label="Answer" name="answer"
            value={props.answer} onChange={props.actions.handleChange} required />
          <Button variant="contained" color="primary" type="submit" style={{margin: '0.5em'}} onClick={props.actions.handleCancel}>Cancel</Button>
          <Button variant="contained" color="primary" type="submit" style={{margin: '0.5em'}}>
            {
              (props.editing ? 'Edit' : props.deleting ? 'Delete' : 'Add')
            }
          </Button>
        </form>
      </div>
    </Modal>
  );
}
