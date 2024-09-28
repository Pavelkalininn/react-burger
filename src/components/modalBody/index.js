import { ModalHeader } from "../modalHeader";
import modalBodyStyles from './style.module.css';

export function ModalBody({ header, onClose, children }) {
	return (
		<div className={modalBodyStyles.modalBody}>
			<ModalHeader onClose={onClose}>{header}</ModalHeader>
			<div className={modalBodyStyles.content}>{children}</div>
		</div>
	)
}