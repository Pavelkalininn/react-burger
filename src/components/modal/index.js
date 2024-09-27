import { ModalHeader } from "../modalHeader";
import modalStyles from './style.module.css'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from "react";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children, header, onClose }) {

	const keyDownHandler = useCallback(
		(event) => {
    if (event.key === "Escape") {
			onClose()
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
    };
  }, [keyDownHandler]);

	return createPortal(
		(
			<div className={modalStyles.modal} onClick={onClose}>
				<div className={modalStyles.modalBody}>
					<ModalHeader onClose={onClose}>{header}</ModalHeader>
					<div className={modalStyles.content} >
						{children}
					</div>
				</div>
			</div>
		), 
		modalRoot
	);
}

Modal.propTypes = {
  children: PropTypes.element,
	header: PropTypes.string,
	onClose: PropTypes.func
}; 