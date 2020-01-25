import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Fab, Button } from '@material-ui/core';
import { Add as AddIcon, More as MoreIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function BottomAppBar(props) {
  const classes = useStyles();
  console.log(typeof props.useFab, props.useFab);

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Veiwer</Button>
          <Button color="inherit">Editor</Button>
          <Button color="inherit">Categories</Button>
          {props.useFab &&
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={props.fabActions.handleOpen}>
              <AddIcon />
            </Fab>
          }
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
