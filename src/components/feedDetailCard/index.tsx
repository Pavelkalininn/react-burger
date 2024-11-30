import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentOrder } from '../../services/slices/orders';
import styles from './style.module.css';
import { useEffect } from 'react';
import {
  CurrencyIcon, FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';


export function FeedDetailCard(){
  const dispatch = useAppDispatch();
  const { currentOrder } = useAppSelector(state => state.orders);
  const { ingredients } = useAppSelector(state => state.ingredientsSlice)
  const orderId = useParams().number;
  let orderPrice: any;
  orderPrice = currentOrder?.ingredients?.reduce(
    (accumulator, currentValue) =>
      accumulator + ingredients.find((ingred) => ingred._id === currentValue)!.price,
    0,
  );

  useEffect(() => {
    if (!currentOrder){
      dispatch(fetchCurrentOrder({ orderNumber: orderId! }));
    }
  }, [currentOrder, dispatch, orderId]);

  if (!currentOrder) return <div>'LOADING'</div>
  return (
    <div>
      <p className={cn('text text_type_main-medium')}>#{currentOrder.number}</p>
      <p className={cn('text text_type_main-medium', styles.name)}>{currentOrder.name}</p>
      <p className={cn('text text_type_main-default', styles.status)}>{currentOrder.status === 'done' ? 'Выполнен' : 'В работе'}</p>
      <p className={cn('text text_type_main-large', styles.text)}>Состав:</p>
      <ul className={cn(styles.structure, 'text text_type_main-default')}>
        {currentOrder.ingredients.map((ingredient, index) => {
          const ingredientData = ingredients.find(
            preloadedIngredient => preloadedIngredient._id === ingredient
          )!
          const ingredientCount = currentOrder.ingredients.filter(
            orderIngredient => orderIngredient === ingredient
          ).length
          if (currentOrder.ingredients.indexOf(ingredient) !== index)
            return null
          return (
            <li key={index} className={styles.structureComponents}>
              <img className={styles.image} src={ingredientData.image} alt={currentOrder.name} />
              <div className={styles.flexStart}>
                <p className={cn('text text_type_main-default', styles.ingredientName)}>
                  {ingredientData.name}
                </p>
              </div>
              <p className={cn('text text_type_main-default', styles.nowrap)}>
                {`${ingredientCount} X ${ingredientData.price}`} <CurrencyIcon type="primary" />
              </p>
            </li>
          );
        })}
      </ul>
      <div className={styles.structureComponents}>
        <FormattedDate className={styles.date} date={new Date(currentOrder.createdAt)} />
        <p className={cn('text text_type_main-default', styles.nowrap)} >{orderPrice} <CurrencyIcon type="primary" /></p>

      </div>
    </div>
  );
}