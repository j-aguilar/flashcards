import React, {Component}  from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './pages/Home'
import Categories from './pages/Categories'
import Category from './pages/Category'
import Viewer from './pages/Viewer'
import BottomAppBar from './components/BottomAppBar'
import DB from './db.js'

class App extends Component {
  constructor() {
    super()
    const that = this
    this.db = new DB('test')
    this.state = {
      categories: [],
      cards: [],
      qa: {},
    }
    this.fetchCategories = async () => {
      this.setState({ categories: (await this.db.getAllCategories()).rows })
    }
    this.addCategory = async (category) => {
      // console.log(category);
      let res = await this.db.createCategory(category)
      // console.log(res)
      this.fetchCategories()
    }
    this.editCategory = async (category) => {
      // TODO: add editing function to db
    }
    this.fetchCards = async (categoryName) => {
      this.setState({ cards: (await this.db.getCardsFromCategory(categoryName)).rows })
    }
    this.addCard = async (object) => {
      // console.log(object);
      let res = await this.db.createCard(object)
      // console.log(res)
      this.fetchCards(object.category)
    }
    /* bind all object methods to the 'this' property*/
    Object.getOwnPropertyNames(that).filter(p => typeof that[p] === 'function').forEach(m => {that[m] = that[m].bind(that)})
  } /* constructor */

  componentDidMount() {
    this.fetchCategories();
  }

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
        </React.Fragment>
        <Router>
          <Switch>
            <Route path="/categories/:id/viewer/">
              <Viewer cards={this.state.cards || []} fetchCards={this.fetchCards}/>
            </Route>
            <Route path="/categories/:id">
              <Category cards={this.state.cards || []} fetchCards={this.fetchCards} addCard={this.addCard} />
            </Route>
            <Route path="/">
              <Categories categories={this.state.categories || []} addCategory={this.addCategory} />
            </Route>
          </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
