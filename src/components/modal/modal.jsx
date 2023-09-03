import { Overlay, StyledModal } from './modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  onCloseKeyDown = clickedKey => {
    if (clickedKey.code === 'Escape') {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseKeyDown);
  }
  closeOnOverlay = overlay => {
    if (overlay.target === overlay.currentTarget) {
      return this.props.closeModal();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.closeOnOverlay}>
        <StyledModal>
          <img src={this.props.imgLarge} alt="" />
        </StyledModal>
      </Overlay>,
      modalRoot
    );
  }
}
