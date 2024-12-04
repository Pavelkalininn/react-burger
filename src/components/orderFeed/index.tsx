import styles from './style.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import {
  closeConnection, dropCurrentOrder, setCurrentOrder,
  startConnection,
} from '../../services/slices/orders';
import Modal from '../modal';
import { FeedDetailCard } from '../feedDetailCard';


export function OrderFeed({ onlyMy = false }: { onlyMy?: boolean } ){
  const { orderFeed, currentOrder } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const currentUrl = onlyMy ? `/profile/orders` : `/feed`
  const maxImageLength: number = 8
  const modal =  (
    <Modal
      header=""
      onClose={() => {
        dispatch(dropCurrentOrder());
        window.history.replaceState(null, "Orders", currentUrl)
      }}
    >
      <FeedDetailCard />
    </Modal>
  );
  useEffect(() => {
    dispatch(startConnection(`wss://norma.nomoreparties.space/orders${onlyMy? '' : '/all'}`));
    return () => {
      dispatch(closeConnection());
    };
  }, [dispatch, onlyMy]);
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);
  return (
    <>
      {orderFeed && orderFeed.map((order) => {
        const orderPrice = order.ingredients.reduce(
          (accumulator, currentValue) =>
            accumulator + ingredients.find((ingred) => ingred._id === currentValue)!.price,
          0,
        );
        return (
          <div
            key={order.number}
            onClick={() => {
              dispatch(setCurrentOrder(order));
              window.history.replaceState(null, "Order description", `${currentUrl}/${order.number}`)
            }}
            className={styles.orderCard}
          >
            <div className={styles.spaceBetween}>
              <p>#{order.number}</p>
              <FormattedDate className={styles.date} date={new Date(order.createdAt)} />
            </div>
            <p className={styles.orderName}>{order.name}</p>
            <div className={styles.spaceBetween}>
              <div className={styles.imageList}>
                {order.ingredients.map((ingredient: string, index: number) => {
                  if (index < maxImageLength)
                    return (
                      <img key={index}
                        className={styles.image}
                        style={{ left: index * 40 + 'px', zIndex: -index }}
                        src={ingredients.find((ingred) => ingred._id === ingredient)!.image_mobile}
                        alt={ingredients.find((ingred) => ingred._id === ingredient)!.name}
                      />
                    );
                  return null
                })}
                {order.ingredients.length > maxImageLength && (
                  <p className={styles.image} style={{ left: maxImageLength * 43 + 'px' }}>
                    +{order.ingredients.length - maxImageLength}
                  </p>
                )}
              </div>
              <p>
                {orderPrice}
                <CurrencyIcon type="primary" />
              </p>
            </div>
          </div>
        );
      })}
      {currentOrder && modal}
    </>
  );
}