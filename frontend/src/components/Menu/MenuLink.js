
import React from 'react';
import Button from '@material-ui/core/Button';

class MenuLink extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    
    }

    render() {
        return (
            <li style={{ "text-align" : "left" }}>
                <a href="http://localhost:3000/" className="meuLink">
                <i className={`fa ${this.props.iconName}`} style={{marginRight: '10px'}} />
                <span>
                    {this.props.menuName}
                </span>
                </a>
            </li>
        );
    }
}

export default MenuLink