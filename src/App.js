import React, {Component}  from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './pages/Home'
import Categories from './pages/Categories'
import Category from './pages/Category'
import Viewer from './pages/Viewer'
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

    /* bind all object methods to the 'this' property */
    Object.getOwnPropertyNames(that).filter(p => typeof that[p] === 'function').forEach(m => {that[m] = that[m].bind(that)})
    /* bind db methods to the this property */
    let init = (function() {
      const O = Object, gopn = 'getOwnPropertyNames', db = that.db, crud = ['create', 'read', 'update', 'delete']
      crud.forEach(o => {
        O[gopn](db[o]).filter(p => typeof db[o][p] === 'function').forEach(m => {db[o][m] = db[o][m].bind(that)})
      })
    })()

  } /* constructor */
  componentDidMount() {
    this.db.read.categories();
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
              <Viewer cards={this.state.cards || []} fetchCards={this.db.read.cards}/>
            </Route>
            <Route path="/categories/:id">
              <Category cards={this.state.cards || []} fetchCards={this.db.read.cards} addCard={this.db.create.card}
                getCard={this.db.read.card} updateCard={this.db.update.card} deleteCard={this.db.delete.card}/>
            </Route>
            <Route path="/">
              <Categories categories={this.state.categories || []} addCategory={this.db.create.category} />
            </Route>
          </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
