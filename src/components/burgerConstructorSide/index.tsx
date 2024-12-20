import BurgerConstructor from '../burgerConstructor';
import styles from './style.module.css';
import cn from 'classnames';

export default function BurgerConstructorSide() {
  return (
    <section className={cn(styles.side_part, styles.topPadding)}>
      <BurgerConstructor />
    </section>
  );
}
