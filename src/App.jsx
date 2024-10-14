import './App.css';
import AppHeader from './components/appHeader';
import BurgerIngredientsSide from './components/burgerIngredientsSide';
import BurgerConstructorSide from './components/burgerConstructorSide';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from './services/slices/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className="main">
          <BurgerIngredientsSide />
          <BurgerConstructorSide />
        </main>
      </DndProvider>
    </>
  );
}

export default App;
