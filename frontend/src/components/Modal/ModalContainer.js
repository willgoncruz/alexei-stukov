
import React from 'react';

class ModalContainer extends React.Component {
  render() {
    if (!this.props.open) {
      return <span />
    }

    return (
      <div className='ModalContainer'>
        <div className='modal-white'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default ModalContainer;
