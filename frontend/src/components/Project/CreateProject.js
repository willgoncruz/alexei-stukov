
import React from 'react';

class CreateProject extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 'step': 'FIRST' }
  }

  render() {
    return (
      <div className='CreateProject'>
        <h2 className='CreateProject__title'>
          Criar projeto
        </h2>

      </div>
    );
  }
}

export default CreateProject;
