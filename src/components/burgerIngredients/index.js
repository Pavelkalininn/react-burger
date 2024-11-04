import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import IngredientCard from '../ingredientCard';
import ingredientsStyles from './style.module.css';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Modal from '../modal';
import { dropIngredient } from '../../services/slices/currentIngredient';
import { CurrentIngredientCard } from '../currentIngredientCard';
import { useNavigate } from 'react-router-dom';

export default function BurgerIngredients() {
  const { ingredients } = useSelector((state) => state.ingredientsSlice);
  const dispatch = useDispatch();
  const currentIngredient = useSelector((state) => state.currentIngredientSlice);
  const navigate = useNavigate()
  const modal = currentIngredient && (
    <Modal
      header="Детали ингредиента"
      onClose={() => {
        dispatch(dropIngredient());
        navigate('/')
      }}
    >
      <CurrentIngredientCard />
    </Modal>
  );

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const ingredientTypes = {
    bun: { name: 'Булки', ref: bunRef },
    sauce: { name: 'Соусы', ref: sauceRef },
    main: { name: 'Начинки', ref: mainRef },
  };
  const [current, setCurrent] = useState(Object.keys(ingredientTypes)[0]);

  const handleScroll = () => {
    const bunsTop = bunRef.current.getBoundingClientRect().top;
    const saucesTop = sauceRef.current.getBoundingClientRect().top;
    const fillingsTop = mainRef.current.getBoundingClientRect().top;
    const topPositions = { bun: bunsTop, sauce: saucesTop, main: fillingsTop };
    const closestTab = Object.keys(topPositions).reduce((prev, curr) =>
      Math.abs(topPositions[curr]) < Math.abs(topPositions[prev]) ? curr : prev,
    );
    setCurrent(closestTab);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (ingredientType) => {
    ingredientTypes[ingredientType].ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={ingredientsStyles.tab}>
        {Object.keys(ingredientTypes).map((ingredientType, ingredirentId) => (
          <Tab
            onClick={() => scrollToSection(ingredientType)}
            key={ingredirentId}
            value={ingredientType}
            active={current === ingredientType}
          >
            {ingredientTypes[ingredientType].name}
          </Tab>
        ))}
      </div>
      <div onScroll={handleScroll} className={ingredientsStyles.ingredientsBox}>
        {Object.keys(ingredientTypes).map((ingredientType, ingredirentId) => (
          <div key={ingredirentId}>
            <p
              ref={ingredientTypes[ingredientType].ref}
              className={cn('text text_type_main-medium', ingredientsStyles.title)}
            >
              {ingredientTypes[ingredientType].name}
            </p>
            <div className={ingredientsStyles.ingredients}>
              {ingredients
                .filter((ingredient) => ingredient.type === ingredientType)
                .map((ingredient, ingredientId) => {
                  return <IngredientCard key={ingredientId} ingredient={ingredient} />;
                })}
            </div>
          </div>
        ))}
      </div>
      {modal}
    </>
  );
}
