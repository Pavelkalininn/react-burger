import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from './style.module.css'
import cn from 'classnames'


export default function AppHeader () {
	return <header>
		<nav className={cn('text text_type_main-default', headerStyle.navigation)}>
			<ul className={headerStyle.left}>
				<li  className={headerStyle.li}>
					<BurgerIcon className={headerStyle.icon}  type="primary" />Конструктор
				</li>
				<li className={headerStyle.li}>
					<ListIcon  className={headerStyle.icon} type="primary" />Лента заказов
				</li>
			</ul>
			<Logo className={headerStyle.logo} />
			<span className={headerStyle.right}>
				<ProfileIcon className={headerStyle.icon} type="primary" />Личный кабинет
				</span>
		</nav>
	</header>
}