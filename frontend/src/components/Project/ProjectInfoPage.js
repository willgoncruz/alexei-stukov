
import React from 'react';
import request from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const API_URL = 'http://18.228.31.90/api';

class TeamCard extends React.PureComponent {
  render() {
    const { id, name } = this.props

    const redirectTeamTasks = () => this.props.history.push(`/team/${id}/tasks`)
    return (
      <Card onClick={redirectTeamTasks} style={{ width: '50%' }}>
        <CardContent style={{ 'paddingBottom': '10px !important', 'overflow': 'hidden', 'cursor': 'pointer' }}>
        <Typography variant="headline" noWrap={true} gutterBottom>
          {name} (ID: {id})
        </Typography>
        </CardContent>
      </Card>
    )
  }
}

class ProjectInfoPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      project: {}
    }
  }

  componentWillMount() {
    const { id } = this.props.match.params
    
    this.props.changeMenu(id)

    request.get(`${API_URL}/projects/${id}/?format=json`).then(response => {
      this.setState({ project: response.data })
    })
  }

  render() {
    const { project } = this.state
    const { id, name, description, teams } = project

    return (
      <div className='ProjectInfoPage form-container flex-container--column'>
        <Typography variant="display2" noWrap={true} gutterBottom>
          { name } (ID: { id })
        </Typography>
        <Typography variant="headline" noWrap={true} gutterBottom>
          Descrição
        </Typography>
        <Typography variant="body1" noWrap={true} paragraph>
          {description}
        </Typography>
      
        <Typography variant="display1" noWrap={true} gutterBottom>
          Times
        </Typography>

        { (teams || []).map(team => <TeamCard key={team.id} {...team} history={this.props.history} />) }

      </div>
    );
  }
}

export default ProjectInfoPage;
