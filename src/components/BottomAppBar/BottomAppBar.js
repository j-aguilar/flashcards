import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  // console.log(id);
  // console.log(typeof props.useFab, props.useFab);

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Button color="inherit" href="/">Categories</Button>
          <Button color="inherit" disabled={(!id)? true : false} href={`/categories/${id}`}>Editor</Button>
          <Button color="inherit" disabled={(!id)? true : false} href={`/categories/${id}/viewer`}>Veiwer</Button>
          {props.useFab &&
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={props.handleOpen}>
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
