import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './style.module.css';
import cn from 'classnames';
import Modal from '../modal';
import { useMemo, useState } from 'react';
import tickImage from '../../images/tick.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder, removeOrder } from '../../services/slices/order';
import { useDrop } from 'react-dnd';
import {
  addIngredientToBurger
} from '../../services/slices/burgerIngredients';

export default function BurgerConstructor() {
  const burgerIngredients = useSelector((state) => state.burgerIngredientsSlice);
  const { number, isSuccess } = useSelector((state) => state.orderNumberSlice);
  const [{ isHover } , drop] = useDrop({
    accept: "animal",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addIngredientToBurger(item));
    },
  });
  console.log(burgerIngredients);

  const dispatch = useDispatch();
  const orderSum = useMemo(
    () => burgerIngredients.reduce(
      (result, ingredient) => result + ingredient.price, 0),
    [burgerIngredients]
  )
  const [showOrder, setShowOrder] = useState(false);
  const modal = (
    <Modal
      onClose={() => {
        setShowOrder(!showOrder);
        dispatch(removeOrder());
      }}
    >
      <div>
        <p className={cn('text text_type_digits-large')}>{isSuccess && number}</p>
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
          <div key={i} className={constructorStyles.element}>
            <DragIcon
              className={
                i !== 0 && i !== burgerIngredients.length - 1 ? '' : constructorStyles.hidden
              }
              type="primary"
            />
            <ConstructorElement
              type={(i === 0 && 'top') || (i === burgerIngredients.length - 1 && 'bottom')}
              isLocked={i === 0 || i === burgerIngredients.length - 1}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>
      <p className={cn('text text_type_digits-default', constructorStyles.bottomMenu)}>
        {orderSum}
        <CurrencyIcon className={constructorStyles.icon} type="primary" />
        <Button
          htmlType="button"
          onClick={() => {
            setShowOrder(!showOrder);
            dispatch(fetchOrder())
          }}
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </p>
      {showOrder && modal}
    </>
  );
}

