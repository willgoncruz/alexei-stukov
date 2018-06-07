import React, { Component } from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/mainTheme';

import CreateProject from './components/Project/CreateProject';
import ModalContainer from './components/Modal/ModalContainer';

/* CSS IMPORTS */
import './css/App.css';
import './css/Home.css';
import './css/Header.css';
import './css/index.css';
import './css/main-style.css';
import './css/CreateProjectPage.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', e => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }

  onClick() {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">

        </div>

        <div className="pinned-right">
          <Button variant="fab" color="secondary" aria-label="add" onClick={this.onClick}>
            <AddIcon />
          </Button>
        </div>

        <ModalContainer open={this.state.modalOpen}>
          <CreateProject />
        </ModalContainer>

        { this.props.children }
      </MuiThemeProvider>
    );
  }
}

export default App;
