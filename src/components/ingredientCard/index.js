import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientCardStyles from './style.module.css'

export default function IngredientCard({ ingredient }) {
	return <div className={ingredientCardStyles.card}>
		<div className={ingredientCardStyles.image}>
			<img src={ingredient.image} alt={ingredient.name} />
			<Counter count={1} size="default" extraClass="m-1" />
		</div>
		
		<span className={ingredientCardStyles.price}>
			<p className='text text_type_digits-default'>{ingredient.price} </p>
			<CurrencyIcon type="primary" />
		</span>
		<p className={ingredientCardStyles.text}>{ingredient.name}</p>
	</div>
}