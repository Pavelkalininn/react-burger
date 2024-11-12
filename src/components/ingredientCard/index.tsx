import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { chooseIngredient } from '../../services/slices/currentIngredient';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import {
  BurgerIngredientsSliceType,
  IngredientType,
} from '../../types/burger';

export default function IngredientCard({ ingredient }: {ingredient: IngredientType}) {
  const dispatch = useDispatch();
  const { ingredients, bun } = useSelector((state: BurgerIngredientsSliceType) => state.burgerIngredientsSlice);
  const navigate = useNavigate()
  const ingredientCount = (ingredients.filter(
    (burgerIngredient) => burgerIngredient?._id === ingredient?._id,
  ).length || 0) + (bun?._id === ingredient._id ? 2 : 0);
  const [, drag] = useDrag({
    type: 'new',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={ingredientCardStyles.card}
      onClick={() => {
        dispatch(chooseIngredient(ingredient));
        navigate(`/ingredients/${ingredient?._id}`, { state: {backgroundLocation: true} });

      }}
    >
      <div className={ingredientCardStyles.image}>
        <img src={ingredient.image} alt={ingredient.name} />
        {ingredientCount ? (
          <Counter count={ingredientCount} size="default" extraClass="m-1" />
        ) : null}
      </div>

      <span className={ingredientCardStyles.price}>
        <p className="text text_type_digits-default">{ingredient.price} </p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={ingredientCardStyles.text}>{ingredient.name}</p>
    </div>
  );
}
