import './App.css';
import AppHeader from './components/appHeader';
import BurgerIngredientsSide from './components/burgerIngredientsSide';
import BurgerConstructorSide from './components/burgerConstructorSide';
import { useEffect } from 'react';
import { fetchIngredients } from './services/slices/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation } from 'react-router-dom';
import { NotFound404Card } from './pages/notFound404';
import { LoginPageCard } from './pages/login';
import { pageWrapper } from './hocs';
import { RegisterCard } from './pages/register';
import { ForgotPasswordCard } from './pages/forgotPassword';
import { ResetPasswordCard } from './pages/resetPassword';
import { ProfilePageCard } from './pages/profilePage';
import {
  OnlyAuth,
  OnlyUnAuth,
} from './components/protectedRouteElement';
import {
  fetchToken,
  fetchUser,
  setIsAuthChecked,
} from './services/slices/authorization';
import Cookies from 'universal-cookie';
import { CurrentIngredientCard } from './components/currentIngredientCard';
import { useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  let location = useLocation()

  let backgroundLocation = location.state?.backgroundLocation

  useEffect(() => {
    const cookies = new Cookies();
    dispatch(fetchIngredients());
    if (cookies.get('accessToken')) {
      dispatch(fetchUser()).catch((error) => {
        dispatch(fetchToken())

      })
    }
    dispatch(setIsAuthChecked(true))
  }, [dispatch]);

  const LoginPage = pageWrapper(LoginPageCard)
  const RegisterPage = pageWrapper(RegisterCard);
  const NotFoundPage = pageWrapper(NotFound404Card);
  const ForgotPasswordPage = pageWrapper(ForgotPasswordCard);
  const ResetPasswordPage = pageWrapper(ResetPasswordCard);
  const ProfilePage = pageWrapper(ProfilePageCard);
  const IngredientPage = pageWrapper(CurrentIngredientCard);

  return (
    <>
      <AppHeader />

      <main className="main">
        {!backgroundLocation && (
          <Routes>
            <Route path="/ingredients/:id" element={<IngredientPage />} />
          </Routes>
        )}
        <Routes location={backgroundLocation || location}>
          <Route
            path="/"
            element={
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredientsSide />
                <BurgerConstructorSide />
              </DndProvider>
            }
          />
          <Route path="/login" element={<OnlyUnAuth element={<LoginPage title="Вход" />} />} />
          <Route
            path="/register"
            element={<OnlyUnAuth element={<RegisterPage title="Регистрация" />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth element={<ForgotPasswordPage title="Восстановление пароля" />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth element={<ResetPasswordPage title="Восстановление пароля" />} />}
          />
          <Route path="/profile" element={<OnlyAuth element={<ProfilePage title="" />} />} />
          <Route path="/ingredients/:id" element={''} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
      }

export default App;
