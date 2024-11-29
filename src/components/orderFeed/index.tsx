import styles from './style.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import {
  closeConnection,
  startConnection,
} from '../../services/slices/orders';


export function OrderFeed({ onlyMy = false }: { onlyMy?: boolean } ){
  const { orderFeed } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startConnection(`wss://norma.nomoreparties.space/orders${onlyMy? '' : '/all'}`));
    return () => {
      dispatch(closeConnection());
    };
  }, [dispatch]);
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);
  return (
    <>
      {orderFeed.map((order) => {
        const orderPrice = order.ingredients.reduce(
          (accumulator, currentValue) =>
            accumulator + ingredients.find((ingred) => ingred._id === currentValue)!.price,
          0,
        );
        return (
          <div className={styles.orderCard}>
            <div className={styles.spaceBetween}>
              <p>#{order.number}</p>
              <FormattedDate className={styles.date} date={new Date(order.createdAt)} />
            </div>
            <p className={styles.orderName}>{order.name}</p>
            <div className={styles.spaceBetween}>
              <div className={styles.imageList}>
                {order.ingredients.map((ingredient: string, index: number) => (
                  <img
                    className={styles.image}
                    style={{ left: 100 - index * 40 + 'px' }}
                    src={ingredients.find((ingred) => ingred._id === ingredient)!.image_mobile}
                    alt={ingredients.find((ingred) => ingred._id === ingredient)!.name}
                  />
                ))}
              </div>
              <p>
                {orderPrice}
                <CurrencyIcon type="primary" />
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}