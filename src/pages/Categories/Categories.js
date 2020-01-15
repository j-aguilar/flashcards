import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function NoCategories(props) {
  console.log(props.categories);
  return <ListItem><ListItemText primary="No categories..." /></ListItem>
}

function Categories (props) {
  console.log(props.categories)
  const classes = useStyles();
  const CategoryList = () => {
    let component = ''
    switch (props.categories.length) {
      case 0:
        component = <NoCategories />
        break;
      default:
        component = props.categories.map( category => {
          return <ListItemLink href="#simple-list"> <ListItemText primary={category} /> </ListItemLink>
        })
        break;

    }
    return component
  }
  return (
    <div className={classes.root}>
      <List>
        {CategoryList()}
      </List>
    </div>
  )
}

export default Categories
