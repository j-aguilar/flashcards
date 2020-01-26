import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
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

  // console.log(props.fabActions);
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.fabActions.handleClose}
    >
      <div className={classes.modal}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={props.fabActions.handleSubmit}>
          <TextField multiline placeholder="Question" fullWidth label="Question" name="question"
             value={props.question} onChange={props.fabActions.handleChange} autoFocus required />
          <TextField multiline placeholder="Answer" fullWidth label="Answer" name="answer"
            value={props.answer} onChange={props.fabActions.handleChange} required />
          <Button variant="contained" color="primary" type="submit" style={{marginTop: '0.5em'}}>Submit</Button>
        </form>
      </div>
    </Modal>
  );
}
