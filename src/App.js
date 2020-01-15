import React, {Component}  from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import PouchDB from 'pouchdb'
import './App.css';
import data from './data/data.js'
import Flex from './components/Flex'
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
  }

  render() {
    return (
      <div className="App">
        <Router>
        <Switch>
            <Route path="/">
              <Flex>
                <Viewer categories={this.state.categories} />
              </Flex>
            </Route>
          </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
