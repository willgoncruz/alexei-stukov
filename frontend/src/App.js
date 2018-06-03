import React, { Component } from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import Header from './components/Header/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/mainTheme';

/* CSS IMPORTS */
import './css/App.css';
import './css/Header.css';
import './css/index.css';
import './css/settings.css';
import './css/main-style.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header hasSearch={true} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
