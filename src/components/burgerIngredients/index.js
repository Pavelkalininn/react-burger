import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Fragment, useState } from "react";
import IngredientCard from '../ingredientCard'
import ingredientsStyles from './style.module.css'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/propTypes";
import cn from 'classnames'


export default function BurgerIngredients ({ ingredients }) {
    const ingredientTypes = {'bun': 'Булки', "sauce": 'Соусы', 'main': 'Начинки'}
    const [current, setCurrent] = useState(Object.keys(ingredientTypes)[0])

    return <>
      <div className={ingredientsStyles.tab}>
        {Object.keys(ingredientTypes).map((ingredientType, ingredirentId) => (
          <Tab key={ingredirentId} value={ingredientType} active={current === ingredientType} onClick={setCurrent}>{ingredientTypes[ingredientType]}</Tab>
          ))}
      </div>
      <div className={ingredientsStyles.ingredients}>
        {Object.keys(ingredientTypes).map((ingredientType, ingredirentId) => (
          <Fragment key={ingredirentId}>
            <p className={cn("text text_type_main-medium", ingredientsStyles.title)}>{ingredientTypes[ingredientType]}</p>
            {
              ingredients.filter(ingredient => ingredient.type === ingredientType).map((ingredient, ingredientId) => {
                return <IngredientCard key={ingredientId} ingredient={ingredient} />
              })
            }
          </Fragment>
          )
        )}
      </div>
    </>
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    ingredientPropTypes
  ).isRequired
}; 