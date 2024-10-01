import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './style.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/propTypes';
import Modal from '../modal';
import { useState } from 'react';
import tickImage from '../../images/tick.svg';

export default function BurgerConstructor({ ingredients }) {
  const [showOrder, setShowOrder] = useState(false);
  const modal = (
    <Modal onClose={() => setShowOrder(!showOrder)}>
      <div>
        <p className={cn('text text_type_digits-large')}>034536</p>
        <p className={cn(constructorStyles.identity)}> идентификатор заказа</p>
        <img className={constructorStyles.image} src={tickImage} alt={'tick'} />
        <p className={cn(constructorStyles.cookStart)}> Ваш заказ начали готовить</p>
        <p className={cn(constructorStyles.wait)}> Дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>
  );

  return (
    <>
      <div className={constructorStyles.constructor}>
        {ingredients.map((item, i) => (
          <div key={i} className={constructorStyles.element}>
            <DragIcon
              className={
                i !== 0 && i !== ingredients.length - 1
                  ? ''
                  : constructorStyles.hidden
              }
              type="primary"
            />
            <ConstructorElement
              type={
                (i === 0 && 'top') ||
                (i === ingredients.length - 1 && 'bottom')
              }
              isLocked={
                i === 0 || i === ingredients.length - 1
              }
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>
      <p className={cn('text text_type_digits-default', constructorStyles.bottomMenu)}>
        666
        <CurrencyIcon className={constructorStyles.icon} type="primary" />
        <Button
          htmlType="button"
          onClick={() => setShowOrder(!showOrder)}
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};
