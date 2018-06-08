
import React from 'react';
import Modal from '@material-ui/core/Modal';


class ModalContainer extends React.Component {
  render() {
    if (!this.props.open) {
      return <span />
    }

    return (
      <Modal open={this.props.open} onClose={this.props.onClick}>
        { React.cloneElement(this.props.children, { closeModal: this.props.onClick }) }
      </Modal>
    );
  }
}

export default ModalContainer;
