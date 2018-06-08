
import React from 'react';
import request from 'axios';
import TextField from '@material-ui/core/TextField';

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
        <h2 className='CreateProject__title'>
          Criação de projeto
        </h2>

        <div className='text-field-centralize'>
          <TextField name='name' label='Nome' value={this.state.name} onChange={this.onChange} fullWidth />
        </div>

        <div className='text-field-centralize'>
          <TextField name='description' label='Descrição' value={this.state.description} onChange={this.onChange} multiline fullWidth />
        </div>

        <div className='create-project-button' onClick={this.createProject}>
          <span> Criar Projeto > </span>
        </div>

      </div>
    );
  }
}

export default CreateProject;
