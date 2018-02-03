import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p id="test"></p>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

class Personal extends Component {
  render() {
    return (
      <div><a href="#">Test</a></div>
      )
  }
}

ReactDOM.render(<Personal />, document.getElementById('p'))
export default App;
