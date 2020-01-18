import React, {Component}  from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import PouchDB from 'pouchdb'
import './App.css';
import 'typeface-roboto';
import data from './data/data.js'
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
      qa: {},
    }
    this.addCategory = this.addCategory.bind(this);
  }

  componentWillMount() {
    this.updateCategories();
  }

  async updateCategories() {
    const categories = await this.state.db.getAllCategories()

    console.log(categories);

    this.setState({
      categories: categories.rows
    })
  }

  async addCategory(category) {
    console.log(category);
    let res = await this.state.db.createCategory(category)
    console.log(res)
    this.updateCategories()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/categories/:id">
              <Category />
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
