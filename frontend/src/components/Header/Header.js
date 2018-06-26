import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import { history } from './../../routes'

class Header extends React.Component {
    render() {
        return (
            <AppBar position="static" color="primary">
                <div className="header-container">
                    <div style={{color:'white'}}>
                    {
                        this.props.hasSearch &&
                        <Input style={{color:'white'}} label="Busca"
                               id="search-textfield"
                               startAdornment={
                                   <InputAdornment style={{color:'white'}} position="start">
                                       <SearchIcon />
                                   </InputAdornment>
                               }
                        />
                    }
                    <Button className="header__item"
                            size="small" onClick={ () => history.push('/') }>
                            <span className="button-content">Projetos</span>
                    </Button>
                    </div>
                    <IconButton aria-label="Ações">
                        <SettingsIcon className="button-content" />
                    </IconButton>
                    <IconButton aria-label="Notificações">
                        <NotificationsIcon className="button-content" />
                    </IconButton>
                </div>



            </AppBar>
        );
    }
}

export default Header;
