import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
import HearingIcon from '@material-ui/icons/Hearing';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(2),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

export default function VerticalDividers(props) {
  const classes = useStyles();
  console.log(props)

  return (
    <Grid container alignItems="center" className={classes.root}>
      <PlaylistPlayIcon onClick={props.toggleAutoPlay}/>
      <HearingIcon onClick={props.readAload}/>
      <Divider orientation="vertical" />
      <ThreeDRotation onClick={props.flipCard}/>
      <ArrowForwardIcon onClick={props.getNextQASet}/>
    </Grid>
  );
}
