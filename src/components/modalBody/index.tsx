import { ModalHeader } from '../modalHeader';
import modalBodyStyles from './style.module.css';
import { ReactNode } from 'react';

export function ModalBody({ header, onClose, children }: {header: string, onClose: () => void, children: ReactNode}) {
  return (
    <div className={modalBodyStyles.modalBody}>
      <ModalHeader onClose={onClose}>{header}</ModalHeader>
      <div className={modalBodyStyles.content}>{children}</div>
    </div>
  );
}
