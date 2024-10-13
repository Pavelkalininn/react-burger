import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './style.module.css';
import cn from 'classnames';
import Modal from '../modal';
import { useMemo } from 'react';
import tickImage from '../../images/tick.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder, removeOrder } from '../../services/slices/order';
import { useDrop } from 'react-dnd';
import {
  addBunToBurger,
  addIngredientToBurger,
} from '../../services/slices/burgerIngredients';
import { BurgerConstructorIngredient } from '../burgerConstructorIngredient';

export default function BurgerConstructor() {
  const burgerIngredients = useSelector((state) => state.burgerIngredientsSlice);
  const {
    number,
    isError,
    error,

  } = useSelector((state) => state.orderNumberSlice);
 
  const [, drop] = useDrop({
    accept: "new",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item, monitor) {
      if (item.type === 'bun') return dispatch(addBunToBurger({ingredient: item}))
      dispatch(addIngredientToBurger({ingredient: item, id: -1}));
    },
  });
  

  const dispatch = useDispatch();
  const orderSum = useMemo(
    () => burgerIngredients.reduce(
      (result, ingredient) => result + ingredient.price, 0),
    [burgerIngredients]
  )
  const modal = (
    <Modal
      onClose={() => {
        dispatch(removeOrder());
      }}
    >
      <div>
        <p className={cn('text text_type_digits-large')}>{ number}</p>
        <p className={cn(constructorStyles.identity)}> идентификатор заказа</p>
        <img className={constructorStyles.image} src={tickImage} alt={'tick'} />
        <p className={cn(constructorStyles.cookStart)}> Ваш заказ начали готовить</p>
        <p className={cn(constructorStyles.wait)}> Дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>
  );

  return (
    <>
      <div ref={drop} className={constructorStyles.constructor}>
        {burgerIngredients.map((item, i) => (
         <BurgerConstructorIngredient key={i} pk={i} item={item} />
        ))}
      </div>
      <p className={cn('text text_type_digits-default', constructorStyles.bottomMenu)}>
        {orderSum}
        <CurrencyIcon className={constructorStyles.icon} type="primary" />
        {isError && error}
        <Button
          htmlType="button"
          onClick={() => {
            dispatch(fetchOrder(burgerIngredients.map(ingredient => ingredient._id)))
          }}
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </p>
      {number && modal}
    </>
  );
}

