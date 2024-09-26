import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import modalHeaderStyles from './style.module.css'
import cn from 'classnames'

export function ModalHeader({ children, onClose }) {
	return <div className={cn("text text_type_main-large", modalHeaderStyles.header)}>
		<div className={modalHeaderStyles.left}>
		<p className={modalHeaderStyles.text}>{ children }</p>
		</div>
		<div className={modalHeaderStyles.right}>
		<CloseIcon type="primary" onClick={onClose} />
		</div>
		
		</div>
}