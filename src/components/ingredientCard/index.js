import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientCardStyles from './style.module.css'
import Modal from "../modal";
import { useState } from "react";
import cn from "classnames";

export default function IngredientCard({ ingredient }) {
    const [ showModal, setShowModal ] = useState(false)
    const modal = (
      <Modal header="Детали ингредиента" onClose={() => setShowModal(!showModal)}> 
	  <div className={ingredientCardStyles.modal}>
          <img className={ingredientCardStyles.image} src={ingredient.image_large} alt={ingredient.name} />
		  <p className={cn("text text_type_main-large", ingredientCardStyles.text)}>{ingredient.name}</p>
		  <ul className={ingredientCardStyles.structure}>
			<li className={cn("text text_type_main-default", ingredientCardStyles.structureComponents)}>Калории, ккал <br></br>{ingredient.calories}</li>
			<li className={cn("text text_type_main-default", ingredientCardStyles.structureComponents)}>Белки г. <br></br>{ingredient.proteins}</li>
			<li className={cn("text text_type_main-default", ingredientCardStyles.structureComponents)}>Жиры г. <br></br>{ingredient.fat}</li>
			<li className={cn("text text_type_main-default", ingredientCardStyles.structureComponents)}>Углеводы г. <br></br>{ingredient.carbohydrates}</li>
		  </ul>
		</div>
      </Modal>
    );
	return <div className={ingredientCardStyles.card} onClick={() => setShowModal(!showModal)}>
		<div className={ingredientCardStyles.image}>
			<img src={ingredient.image} alt={ingredient.name} />
			<Counter count={1} size="default" extraClass="m-1" />
		</div>
		
		<span className={ingredientCardStyles.price}>
			<p className='text text_type_digits-default'>{ingredient.price} </p>
			<CurrencyIcon type="primary" />
		</span>
		<p className={ingredientCardStyles.text}>{ingredient.name}</p>
		{showModal && modal}
	</div>
}