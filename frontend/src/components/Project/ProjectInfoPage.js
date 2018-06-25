
import React from 'react';
import request from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const API_URL = 'http://18.228.31.90/api';

class TeamCard extends React.PureComponent {
  render() {
    const { id, name } = this.props

    const redirectTeamTasks = () => this.props.history.push(`/team/${id}/tasks`)
    return (
      <Card onClick={redirectTeamTasks} style={{ width: '50%' }}>
        <CardContent style={{ 'paddingBottom': '10px !important', 'overflow': 'hidden', 'cursor': 'pointer' }}>
          {name} (ID: {id})
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

    request.get(`${API_URL}/projects/${id}/?format=json`).then(response => {
      this.setState({ project: response.data })
    })
  }

  render() {
    const { project } = this.state
    const { id, name, description, teams } = project

    return (
      <div className='ProjectInfoPage form-container flex-container--column'>
        <h2 className='ProjectInfoPage__title'>
          { name } (ID: { id })
        </h2>

        <span style={{ fontStyle: 'italic' }}>{description}</span>

        <h2>Teams</h2>

        { (teams || []).map(team => <TeamCard key={team.id} {...team} history={this.props.history} />) }

      </div>
    );
  }
}

export default ProjectInfoPage;
