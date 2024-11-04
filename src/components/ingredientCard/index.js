import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { chooseIngredient } from '../../services/slices/currentIngredient';
import { useDrag } from 'react-dnd';
import { replace, useNavigate } from 'react-router-dom';

export default function IngredientCard({ ingredient }) {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.burgerIngredientsSlice);
  const navigate = useNavigate()
  const ingredientCount = ingredients.filter(
    (burgerIngredient) => burgerIngredient?._id === ingredient?._id,
  ).length;
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
