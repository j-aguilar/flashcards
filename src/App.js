import React, {Component}  from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/data.js'
import Flex from './flex/Flex'
import FlipCard from './flipcard/FlipCard'

class App extends Component {

  render() {
    console.log(typeof data, data)
    return (
      <div className="App">
        <Flex>
          <FlipCard />
        </Flex>
      </div>
    );
  }
}

export default App;
