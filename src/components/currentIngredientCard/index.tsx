import ingredientsStyles from '../burgerIngredients/style.module.css';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { chooseIngredient } from '../../services/slices/currentIngredient';
import {
  currentIngredientSliceType,
  ingredientsSliceType,
} from '../../types/burger';
import { useAppDispatch, useAppSelector } from '../../hooks';


export function CurrentIngredientCard(){
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state: ingredientsSliceType) => state.ingredientsSlice);
  const currentIngredient = useAppSelector((state: currentIngredientSliceType) => state.currentIngredientSlice);
  const ingredientId = useParams().id;
  if (!currentIngredient){
    dispatch(chooseIngredient(ingredients.find(ingredient => ingredient._id === ingredientId)!));
  }

  if (!currentIngredient) return <div>'LOADING'</div>
  return(
    <>
      <img
        className={ingredientsStyles.image}
        src={currentIngredient.image_large}
        alt={currentIngredient.name}
      />
      <p className={cn('text text_type_main-large', ingredientsStyles.text)}>
        {currentIngredient.name}
      </p>
      <ul className={cn(ingredientsStyles.structure, 'text text_type_main-default')}>
        <li className={ingredientsStyles.structureComponents}>
          <p>Калории, ккал</p>
          {currentIngredient.calories}
        </li>
        <li className={ingredientsStyles.structureComponents}>
          <p>Белки г.</p>
          {currentIngredient.proteins}
        </li>
        <li className={ingredientsStyles.structureComponents}>
          <p>Жиры г.</p>
          {currentIngredient.fat}
        </li>
        <li className={ingredientsStyles.structureComponents}>
          <p>Углеводы г.</p>
          {currentIngredient.carbohydrates}
        </li>
      </ul>
    </>
  )
}