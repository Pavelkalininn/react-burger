import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import IngredientCard from '../ingredientCard'
import ingredientsStyles from './style.module.css'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/propTypes";

export default function BurgerIngredients ({ ingredients }) {
    const [current, setCurrent] = useState('bun')
    const [displayedIngredients, setDisplayedIngredients] = useState([])

    useEffect(_ => {
        setDisplayedIngredients(
          ingredients.filter(ingredient => ingredient.type === current)
        )
      }, [current])

    return <>
      <div className={ingredientsStyles.tab}>
       <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={ingredientsStyles.ingredients}>
        {
          displayedIngredients.map((ingredient, ingredientId) => {
            return <IngredientCard key={ingredientId} ingredient={ingredient} />
          })
        }
      </div>
    </>
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    ingredientPropTypes
  ).isRequired
}; 