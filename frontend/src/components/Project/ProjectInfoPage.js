
import React from 'react';
import request from 'axios';
import Header from '../Header/Header';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const API_URL = 'http://18.228.31.90/api';

class TeamCard extends React.PureComponent {
  render() {
    const { id } = this.props

    return (
      <Card>
        <CardContent style={{ 'paddingBottom': '10px !important', 'overflow': 'hidden', 'cursor': 'pointer' }}>
          Team {id}
        </CardContent>
      </Card>
      // <div>
      // </div>
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

        <span>{description}</span>

        <h2>Teams</h2>

        { (teams || []).map(team => <TeamCard key={team.id} {...team} />) }

      </div>
    );
  }
}

export default ProjectInfoPage;
