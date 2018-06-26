
import React from 'react';
import request from 'axios';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const API_URL = 'http://18.228.31.90/api';

class CreateProject extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 'FIRST',
      name: '',
      description: ''
    }

    this.onChange = this.onChange.bind(this)
    this.createProject = this.createProject.bind(this)
  }

  createProject() {
    const data = Object.assign({}, this.state)
    delete data['step']

    request.post(`${API_URL}/projects/?format=api`, data).then(this.props.closeModal).catch(() => {})
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value  })
  }

  render() {
    return (
      <div className='CreateProject'>
        <Typography variant="display2" noWrap={true} gutterBottom className='CreateProject__title'>
          <p >
            Criação de projeto
          </p>
        </Typography>
        

        <div className='text-field-centralize'>
          <TextField name='name' label='Nome' value={this.state.name} onChange={this.onChange} fullWidth />
        </div>

        <div className='text-field-centralize'>
          <TextField name='description' label='Descrição' value={this.state.description} onChange={this.onChange} multiline fullWidth />
        </div>

        <div className='text-field-centralize'>
          <TextField name='image_url' label='Url da Imagem do projeto' value={this.state.image_url} onChange={this.onChange} multiline fullWidth />
        </div>

        <div className='create-project-button'>
          <Button onClick={this.createProject}> Criar Projeto > </Button>
        </div>

      </div>
    );
  }
}

export default CreateProject;
