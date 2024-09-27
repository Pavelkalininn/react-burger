import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import constructorStyles from './style.module.css'
import cn from "classnames"
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/propTypes";
import Modal from "../modal";
import { useState } from "react";
import tickImage from '../../images/tick.svg'

export default function BurgerConstructor ({ ingredients }) {
	const [ showOrder, setShowOrder ] = useState(false)
    const modal = (
      <Modal onClose={() => setShowOrder(!showOrder)} > 
	  <div>
		  <p className={cn("text text_type_digits-large")}>034536</p>
		  <p className={cn(constructorStyles.identity)}> идентификатор заказа</p>
		  <img className={constructorStyles.image} src={tickImage} alt={'tick'} />
		  <p className={cn(constructorStyles.cookStart)}> Ваш заказ начали готовить</p>
		  <p className={cn(constructorStyles.wait)}> Дождитесь готовности на орбитальной станции</p>
		</div>
      </Modal>
    );


	return <>
	  <div className={constructorStyles.constructor}>
			{
				ingredients.map((constructorElementData, constructorElementId) => (
					<div key={constructorElementId} className={constructorStyles.element}>
						<DragIcon className={constructorElementId !== 0 && constructorElementId !== ingredients.length - 1 ? "" : constructorStyles.hidden} type="primary" />
						<ConstructorElement
							type={(constructorElementId === 0 && 'top') || (constructorElementId === ingredients.length - 1 && 'bottom')}
							isLocked={constructorElementId === 0 || constructorElementId === ingredients.length - 1}
							text={constructorElementData.name}
							price={constructorElementData.price}
							thumbnail={constructorElementData.image}
					/>
				</div>
				))
			}
    </div>
		<p className={cn('text text_type_digits-default', constructorStyles.bottomMenu)}>666<CurrencyIcon className={constructorStyles.icon} type="primary" />
		<Button htmlType="button" onClick={() => setShowOrder(!showOrder)} type="primary" size="medium">Оформить заказ</Button>
		</p>
		{showOrder && modal}
			
	
	</>
}


BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    ingredientPropTypes
  ).isRequired
}; 