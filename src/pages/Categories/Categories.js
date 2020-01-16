import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Flex from './../../components/Flex'
import CategoryForm from './../../components/CategoryForm'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 200,
  }
}));

function ListItemLink(props) {
  console.log(props);
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
          return <ListItemLink href="#simple-list" key={`key_${category}`}> <ListItemText primary={category} /> </ListItemLink>
        })
        break;

    }
    return component
  }
  return (
    <Flex>
      <div className={classes.root}>
        <List>
          {CategoryList()}
        </List>
      </div>
      <CategoryForm addCategory={props.addCategory}/>
    </Flex>
  )
}

export default Categories
