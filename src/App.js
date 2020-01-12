import React, {Component}  from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/data.js'
import FlipCard from './flipcard/Flip_card'

class App extends Component {

  render() {
    console.log(typeof data, data)
    return (
      <div className="App">
        <FlipCard />
      </div>
    );
  }
}

export default App;
