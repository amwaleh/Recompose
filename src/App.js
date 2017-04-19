import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/welcome';
import Movies from './components/body';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Header />
        <p className="App-intro">
        
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Movies />
      </div>
      
    );
  }
}

export default App;
