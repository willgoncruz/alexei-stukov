
import React from 'react';
import Modal from '@material-ui/core/Modal';


class ModalContainer extends React.Component {
  render() {
    if (!this.props.open) {
      return <span />
    }

    return (
      <Modal open={this.props.open} onClose={this.props.onClick}>
        {this.props.children}
      </Modal>
    );
  }
}

export default ModalContainer;
