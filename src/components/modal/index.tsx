import modalStyles from './style.module.css';
import { createPortal } from 'react-dom';
import { ReactNode, useCallback, useEffect } from 'react';
import { ModalBody } from '../modalBody';

const modalRoot = document.getElementById('react-modals')!;

export default function Modal({ children, header, onClose }: {children: ReactNode, header: string, onClose: () => void}) {
  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
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
