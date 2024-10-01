import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './style.module.css';
import cn from 'classnames';

export default function AppHeader() {
  return (
    <header>
      <nav className={cn('text text_type_main-default', headerStyle.navigation)}>
        <ul className={headerStyle.left}>
          <li className={headerStyle.li}>
            <a href={'/'} className={headerStyle.href}>
              <BurgerIcon className={headerStyle.icon} type="primary" />
              Конструктор
            </a>
          </li>
          <li className={headerStyle.li}>
            <a href={'/'} className={headerStyle.href}>
              <ListIcon className={headerStyle.icon} type="primary" />
              Лента заказов
            </a>
          </li>
        </ul>
        <Logo className={headerStyle.logo} />
        <span className={headerStyle.right}>
          <a href={'/'} className={headerStyle.href}>
            <ProfileIcon className={headerStyle.icon} type="primary" />
            Личный кабинет
          </a>
        </span>
      </nav>
    </header>
  );
}
