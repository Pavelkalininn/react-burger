import './App.css';
import AppHeader from './components/appHeader';
import BurgerIngredientsSide from './components/burgerIngredientsSide';
import BurgerConstructorSide from './components/burgerConstructorSide';
import { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [ ingredients, setIngredients ] = useState([])

  useEffect(() => {
    api.getIngredients()
      .then(res => setIngredients(res.data))
      .catch(errors => console.log(errors))
  }, []
)

  return (
    <>
      <AppHeader />
      <main className='main'>
        <BurgerIngredientsSide ingredients={ingredients} />
        <BurgerConstructorSide ingredients={ingredients} />
      </main>
    </>
  );
}

export default App;
