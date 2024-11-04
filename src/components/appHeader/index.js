import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './style.module.css';
import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';

export default function AppHeader() {
  return (
    <header>
      <nav className={cn('text text_type_main-default', headerStyle.navigation)}>
        <ul className={headerStyle.left}>
          <li className={headerStyle.li}>
            <NavLink
              to={'/'}
              className={({ isActive }) => (isActive ? headerStyle.activeHref : headerStyle.href)}
            >
              <BurgerIcon className={headerStyle.icon} type="primary" />
              Конструктор
            </NavLink>
          </li>
          <li className={headerStyle.li}>
            <NavLink
              to={'/profile/orders'}
              className={({ isActive }) => (isActive ? headerStyle.activeHref : headerStyle.href)}
            >
              <ListIcon className={headerStyle.icon} type="primary" />
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <Logo className={headerStyle.logo} />
        <span className={headerStyle.right}>
          <NavLink
            to={'/profile'}
            className={({ isActive }) => (isActive ? headerStyle.activeHref : headerStyle.href)}
          >
            <ProfileIcon className={headerStyle.icon} type="primary" />
            Личный кабинет
          </NavLink>
        </span>
      </nav>
    </header>
  );
}
