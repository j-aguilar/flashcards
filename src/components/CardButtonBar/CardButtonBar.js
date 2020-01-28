import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Divider} from '@material-ui/core';
import {ThreeSixty as ThreeSixtyIcon, Hearing as HearingIcon, PlaylistPlay as PlaylistPlayIcon, ArrowForward as ArrowForwardIcon} from '@material-ui/icons';

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
      <ThreeSixtyIcon onClick={props.flipCard}/>
      <ArrowForwardIcon onClick={props.getNextQASet}/>
    </Grid>
  );
}
