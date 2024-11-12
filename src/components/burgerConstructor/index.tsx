import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
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
  removeIngredients,
} from '../../services/slices/burgerIngredients';
import { BurgerConstructorIngredient } from '../burgerConstructorIngredient';
import { useNavigate } from 'react-router-dom';
import {
  AuthorizationType,
  BurgerIngredientsSliceType,
  OrderNumberSliceType,
} from '../../types/burger';

export default function BurgerConstructor() {
  const { ingredients, bun } = useSelector((state: BurgerIngredientsSliceType) => state.burgerIngredientsSlice);
  const { number, isError, error } = useSelector((state: OrderNumberSliceType) => state.orderNumberSlice);
  const { user } = useSelector((state: AuthorizationType) => state.authorization);
  const navigate = useNavigate();

  const [, drop] = useDrop({
    accept: 'new',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item:any, monitor) {
      if (item.type === 'bun') return dispatch(addBunToBurger({ ingredient: item }));
      dispatch(addIngredientToBurger({ ingredient: item, id: -1 }));
    },
  });

  const dispatch = useDispatch();
  const orderSum = useMemo(() => {
    const ingredientsSum = ingredients.reduce((result, ingredient) => result + ingredient.price, 0);
    const bunSum = bun ? bun.price * 2 : 0;
    return ingredientsSum + bunSum;
  }, [ingredients, bun]);
  const modal = (
    <Modal
      header=''
      onClose={() => {
        dispatch(removeOrder());
        dispatch(removeIngredients({}));
      }}
    >
      <div>
        <p className={cn('text text_type_digits-large')}>{number}</p>
        <p className={cn(constructorStyles.identity)}> идентификатор заказа</p>
        <img className={constructorStyles.image} src={tickImage} alt={'tick'} />
        <p className={cn(constructorStyles.cookStart)}> Ваш заказ начали готовить</p>
        <p className={cn(constructorStyles.wait)}> Дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>
  );

  return (
    <>
      <div ref={drop}>
        {bun && <BurgerConstructorIngredient type="top" item={bun} pk={0} />}
        <div className={cn(constructorStyles.constructor)}>
          {ingredients.map((item, seqNum) => {
            return (
              <BurgerConstructorIngredient
                key={item.uuid}
                item={item}
                pk={seqNum}
                type={undefined}
              />
            );
          })}
        </div>
        {bun && <BurgerConstructorIngredient type="bottom" item={bun} pk={-1} />}
      </div>
      <p className={cn('text text_type_digits-default', constructorStyles.bottomMenu)}>
        {orderSum}
        <CurrencyIcon className={constructorStyles.icon} type="primary" />
        {isError && error}
        <Button
          htmlType="button"
          onClick={() => {
            user
              ? dispatch(
                  // @ts-ignore
                  fetchOrder({
                    ingredients: [
                      ...ingredients.map((ingredient) => ingredient._id),
                      bun._id,
                      bun._id,
                    ],
                  }),
                )
              : navigate('/login');
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
