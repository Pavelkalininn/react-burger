import BurgerIngredients from '../burgerIngredients';
import cn from 'classnames';
import styles from './style.module.css';

export default function BurgerIngredientsSide() {
  return (
    <section className={styles.side_part}>
      <p className={cn('text text_type_main-large', styles.header)}>Соберите бургер</p>
      <BurgerIngredients />
    </section>
  );
}
