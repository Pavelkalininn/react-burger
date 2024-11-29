import styles from './style.module.css';
import { OrderFeed } from '../../components/orderFeed';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';


export function OrderFeedPage() {
  const {orderFeed, total, totalToday} = useAppSelector(state => state.orders);
  function getOrderNumbers(status) {
    return orderFeed?.filter(order => order.status === status).slice(0, 5).map((order) => (
        <p
          key={order.number}
          className={cn('text text_type_main-default', styles.orderNumbers)}
        >
          {order.number}
        </p>
      ))
  }

  return (
    <>
      <div className={styles.main}>
      <p className={cn('text text_type_main-medium', styles.statusHeader)}>Лента заказов</p>
      <div className={styles.grid}>
        <div>
          <div className={styles.orderFeedContainer}>
            <OrderFeed />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.grid}>
            <div>
              <p
                className={cn('text text_type_main-medium', styles.statusHeader)}
              >ГОТОВЫ:</p>
              {getOrderNumbers('done')}
            </div>
            <div>
              <p
                className={cn('text text_type_main-medium', styles.statusHeader)}
              >В РАБОТЕ:</p>
              {getOrderNumbers('created')}
            </div>
          </div>
          <p
            className={cn('text text_type_main-medium', styles.countHeader)}
          >Выполнено за всё время:</p>
            <p className="text text_type_digits-large">{total}</p>
          <p
            className={cn('text text_type_main-medium', styles.countHeader)}
          >Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
      </div>
    </>
  );
}