import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'

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

  console.log(props.fabActions);
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.fabActions.handleClose}
    >
      <div className={classes.modal}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={props.fabActions.handleSubmit}>
          <TextField id="standard-full-width" placeholder="Category Name" fullWidth label="Category Name"
             value={props.name} onChange={props.fabActions.handleChange} />
        </form>
      </div>
    </Modal>
  );
}
