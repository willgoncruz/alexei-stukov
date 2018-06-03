import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

class Header extends React.Component {
    render() {
        return (
            <AppBar position="static" color="primary">
                <div className="header-container">
                    <div>
                    {
                        this.props.hasSearch &&
                        <Input label="Busca"
                               id="search-textfield"
                               startAdornment={
                                   <InputAdornment position="start">
                                       <SearchIcon />
                                   </InputAdornment>
                               }
                        />
                    }
                    <Button className="header__item"
                            size="small">
                            <span className="button-content">Home</span>
                    </Button>
                    <Button className="header__item"
                            size="small">
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