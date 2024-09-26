import { ModalHeader } from "../modalHeader";
import modalStyles from './style.module.css'
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children, header, onClose }) {
	return createPortal(
		(
			<div className={modalStyles.modal} onClick={onClose}>
				<div className={modalStyles.modalBody}>
					<ModalHeader onClose={onClose}>{header}</ModalHeader>
						{children}
				</div>
			</div>
		), 
		modalRoot
	);
  
} 