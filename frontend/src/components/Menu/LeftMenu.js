import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider'

class LeftMenu extends React.Component {
    render() {

        return (<div style={{width: '200px', height: '100%', backgroundColor: 'black'}}></div>);

        // return (<Drawer variant="permanent"
        //         anchor={'left'}>
        //     LEFT MENU
        //     <Divider />
        //     <Divider />
        // </Drawer>);
    }
}

export default LeftMenu;