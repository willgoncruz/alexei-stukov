import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class LeftMenu extends React.Component {
    render() {
        return (
            <Drawer variant="permanent"
                    anchor={'left'}>
                <div id="left-menu">
                    <img className="project-image" src="https://vignette.wikia.nocookie.net/starcraft/images/e/e1/AlexeiStukov_HotS_Head1.jpg" />
                    <Typography style={{color:'white'}} variant="headline" component="h3">Alexei Stukov</Typography>
                    <Divider />
                </div>
            </Drawer>
        );
    }
}

export default LeftMenu;