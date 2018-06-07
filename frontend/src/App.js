import React, { Component } from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/mainTheme';

/* CSS IMPORTS */
import './css/App.css';
import './css/Home.css';
import './css/Header.css';
import './css/index.css';
import './css/main-style.css';
import './css/CreateProjectPage.css';
import './css/LeftMenu.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          
        </div>
        { this.props.children }
      </MuiThemeProvider>
    );
  }
}

export default App;
