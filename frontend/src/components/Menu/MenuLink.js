
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { history } from './../../routes'

class MenuLink extends React.Component {
    constructor(props) {
        super(props)
    
    }

    render() {
        return (
            <Typography variant="title" noWrap={true} gutterBottom>
            <li style={{ "text-align" : "left" }}>
                <a onClick={() => history.push(`${this.props.href}`)} className="meuLink">
                <i className={`fa ${this.props.iconName}`} style={{marginRight: '10px'}} />
                <span>
                    {this.props.menuName} 
                </span>
                </a>
            </li>
            </Typography>
        );
    }
}

export default MenuLink