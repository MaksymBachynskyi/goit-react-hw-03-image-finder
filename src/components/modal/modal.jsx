import { Overlay, StyledModal } from './modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', clickedKey => {
      if (clickedKey.code === 'Escape') {
        this.props.onCloseModalEscape();
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', clickedKey => {
      if (clickedKey.code === 'Escape') {
        this.props.onCloseModalEscape();
      }
    });
  }
  render() {
    return createPortal(
      <Overlay onClick={this.props.closeModal}>
        <StyledModal>
          <img src={this.props.imgLarge} alt="" />
        </StyledModal>
      </Overlay>,
      modalRoot
    );
  }
}
