import './App.css';
import AppHeader from './components/appHeader';
import { data } from './utils/data';
import BurgerIngredientsSide from './components/burgerIngredientsSide';
import BurgerConstructorSide from './components/burgerConstructorSide';

function App() {
  return (
    <>
      <AppHeader />
      <main className='main'>
        <BurgerIngredientsSide  ingredients={data} />
        <BurgerConstructorSide  ingredients={data} />
      </main>
    </>
  );
}

export default App;
