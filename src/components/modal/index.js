import modalStyles from './style.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { ModalBody } from '../modalBody';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, header, onClose }) {
  const keyDownHandler = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false);
    return () => {
      document.removeEventListener('keydown', keyDownHandler, false);
    };
  }, [keyDownHandler]);

  return createPortal(
    <div className={modalStyles.modal} onClick={onClose}>
      <ModalBody children={children} header={header} onClose={onClose} />
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  header: PropTypes.string,
  onClose: PropTypes.func,
};
