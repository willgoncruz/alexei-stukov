
import React from 'react';
import TextField from '@material-ui/core/TextField';

class CreateProject extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 'FIRST',
      name: '',
      description: ''
    }
  }

  render() {
    return (
      <div className='CreateProject'>
        <h2 className='CreateProject__title'>
          Criação de projeto
        </h2>

        <div className='text-field-centralize'>
          <TextField label='Nome' value={this.state.name} fullWidth />
        </div>

        <div className='text-field-centralize'>
          <TextField label='Descrição' value={this.state.description} multiLine fullWidth />
        </div>

      </div>
    );
  }
}

export default CreateProject;
