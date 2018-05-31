import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Button from '@material-ui/core/Button'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, lalalalala edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>Botao</Button>
        { this.props.children }
      </div>
    );
  }
}

export default App;
