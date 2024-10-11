import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyles from './style.module.css';
import Modal from '../modal';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import {
  chooseIngredient,
  dropIngredient,
} from '../../services/slices/currentIngredient';
import { useState } from 'react';
import { useDrag } from 'react-dnd';



export default function IngredientCard({ ingredient }) {
  const [showModal, setShowModal] = useState(false);
  const [{ isDrag }, drag] = useDrag({
    type: "animal",
    item: ingredient ,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const dispatch = useDispatch()
  const modal = (
    <Modal header="Детали ингредиента" onClose={() => {
      setShowModal(!showModal);
      dispatch(dropIngredient())
    }}>
      <>
        <img
          className={ingredientCardStyles.image}
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        <p className={cn('text text_type_main-large', ingredientCardStyles.text)}>
          {ingredient.name}
        </p>
        <ul className={cn(ingredientCardStyles.structure, 'text text_type_main-default')}>
          <li className={ingredientCardStyles.structureComponents}>
            <p>Калории, ккал</p>
            {ingredient.calories}
          </li>
          <li className={ingredientCardStyles.structureComponents}>
            <p>Белки г.</p>
            {ingredient.proteins}
          </li>
          <li className={ingredientCardStyles.structureComponents}>
            <p>Жиры г.</p>
            {ingredient.fat}
          </li>
          <li className={ingredientCardStyles.structureComponents}>
            <p>Углеводы г.</p>
            {ingredient.carbohydrates}
          </li>
        </ul>
      </>
    </Modal>
  );
  return (
    <div ref={drag} className={ingredientCardStyles.card} onClick={
      () => {setShowModal(!showModal); dispatch(chooseIngredient(ingredient))}}>
      <div className={ingredientCardStyles.image}>
        <img src={ingredient.image} alt={ingredient.name} />
        <Counter count={1} size="default" extraClass="m-1" />
      </div>

      <span className={ingredientCardStyles.price}>
        <p className="text text_type_digits-default">{ingredient.price} </p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={ingredientCardStyles.text}>{ingredient.name}</p>
      {showModal && modal}
    </div>
  );
}
