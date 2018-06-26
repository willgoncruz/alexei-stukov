import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import MenuLink from './MenuLink'

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projectId : props.projectId
        };
      }
      componentWillReceiveProps(nextProps) {
        this.setState({ projectId: nextProps.projectId });  
      }

    render() {
        return (
            <Drawer variant="permanent"
                    anchor={'left'}>
                <div id="left-menu">
                    <img className="project-image" alt="Project" src="https://vignette.wikia.nocookie.net/starcraft/images/e/e1/AlexeiStukov_HotS_Head1.jpg" />
                    <Typography style={{color:'white'}} variant="headline" component="h3">Alexei Stukov</Typography>
                    <Divider />
                    <br/>
                    { this.state.projectId && 
                    <div style={{ "margin-top" : "10px", "list-style" : "none"}}>
                      <MenuLink menuName={"Visão Geral"} iconName={"fa-eye"} href={`/project/${this.state.projectId}`}/>
                      <MenuLink menuName={"Gráficos"} iconName={"fa-area-chart"} href={`/projects/${this.state.projectId}/statistics`}/>
                    </div>
                    }
                </div>
                
            </Drawer>
        );
    }
}

export default LeftMenu;