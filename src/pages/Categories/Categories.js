import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Flex, CategoryForm, BottomAppBar } from '../_components'


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
  // console.log(props);
  return <ListItem button component="a" {...props} />;
}

function NoCategories(props) {
  // console.log(props.categories);
  return <ListItem><ListItemText primary="No categories..." /></ListItem>
}

export default function Categories (props) {
  // console.log(this)
  // console.log(props.categories)
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const fabActions = {
    handleOpen() {
      setOpen(true);
    },
    handleClose() {
      setOpen(false);
    },
    handleSubmit(event) {
      event.preventDefault()
      // console.log("submitted")
      props.addCategory(name)
      fabActions.handleClose()
      setName('')
    },
    handleChange(event) {
      setName(event.target.value);
    }
  }

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
    <React.Fragment>
      <Flex>
        <div className={classes.root}>
          <List>
            {CategoryList()}
          </List>
        </div>
      </Flex>
      <CategoryForm fabActions={fabActions} open={open} name={name}/>
      <BottomAppBar useFab={true} handleOpen={fabActions.handleOpen}/>
    </React.Fragment>
  )
}
