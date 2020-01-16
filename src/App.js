import React, {Component}  from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import PouchDB from 'pouchdb'
import './App.css';
import 'typeface-roboto';
import data from './data/data.js'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Viewer from './pages/Viewer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      qa: {},
    }
    this.addCategory = this.addCategory.bind(this);
  }

  addCategory(category) {
    console.log(category);
    this.setState((prevState) => {
      let categories = [...prevState.categories, category]
      return {
        categories: categories
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
        <Switch>
            <Route path="/">
              <Categories categories={this.state.categories} addCategory={this.addCategory} />
            </Route>
          </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
