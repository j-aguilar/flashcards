import React, {Component}  from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
//import PouchDB from 'pouchdb'
import './App.css';
import 'typeface-roboto';
//import data from './data/data.js'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Category from './pages/Category'
import Viewer from './pages/Viewer'
import DB from './db.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      db: new DB('test'),
      categories: [],
      cards: [],
      qa: {},
    }
    this.addCategory = this.addCategory.bind(this);
    this.fetchCards = this.fetchCards.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const categories = await this.state.db.getAllCategories()

    this.setState({
      categories: categories.rows
    })
  }

  async addCategory(category) {
    console.log(category);
    let res = await this.state.db.createCategory(category)
    console.log(res)
    this.fetchCategories()
  }

  async editCategory(category) {
    // TODO: add editing function to db
  }

  async fetchCards(categoryName) {
    const cards = await this.state.db.getCardsFromCategory(categoryName)
    console.log(cards)
    this.setState({
      cards: cards.rows
    })
    console.log(this.state.cards)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/categories/:id">
              <Category cards={this.state.cards || []} fetchCards={this.fetchCards}/>
            </Route>
            <Route path="/categories">
              <Categories categories={this.state.categories || []} addCategory={this.addCategory} />
            </Route>
            <Route path="/">
              <Viewer cards={this.state.cards || []} fetchCards={this.fetchCards}/>
            </Route>
          </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
