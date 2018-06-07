import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

class LeftMenu extends React.Component {
    render() {
        return (
            <Drawer variant="permanent"
                    anchor={'left'}>
                <div id="left-menu">
                    <img className="project-image" src="https://vignette.wikia.nocookie.net/starcraft/images/e/e1/AlexeiStukov_HotS_Head1.jpg" />
                    <h3>Alexei Stukov</h3>
                    <Divider />
                    <Divider />
                </div>
            </Drawer>
        );
    }
}

export default LeftMenu;