import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Flex, CategoryForm } from '../_components'

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
          return <ListItemLink href={`/categories/${category.id}`} key={category.key}> <ListItemText primary={category.doc.name} /> </ListItemLink>
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
