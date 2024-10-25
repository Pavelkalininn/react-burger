import './App.css';
import AppHeader from './components/appHeader';
import BurgerIngredientsSide from './components/burgerIngredientsSide';
import BurgerConstructorSide from './components/burgerConstructorSide';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from './services/slices/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router-dom';
import { NotFound404Card } from './pages/notFound404';
import { LoginPageCard } from './pages/login';
import { pageWrapper } from './hocs';
import { RegisterCard } from './pages/register';
import { ForgotPasswordCard } from './pages/forgotPassword';
import { ResetPasswordCard } from './pages/resetPassword';
import { ProfilePageCard } from './pages/profilePage';
import { ProtectedRouteElement } from './components/protectedRouteElement';
import { ProvideAuth } from './services/auth';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);


  const LoginPage = pageWrapper(LoginPageCard)
  const RegisterPage = pageWrapper(RegisterCard)
  const NotFoundPage = pageWrapper(NotFound404Card)
  const ForgotPasswordPage = pageWrapper(ForgotPasswordCard)
  const ResetPasswordPage = pageWrapper(ResetPasswordCard)
  const ProfilePage = pageWrapper(ProfilePageCard)

  return (
    <>
      <ProvideAuth>
        <AppHeader />

        <main className="main">
          <Routes>
            <Route path="/" element={
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredientsSide />
                <BurgerConstructorSide />
              </DndProvider>
            } />
            <Route path="/login" element={<LoginPage title="Вход" />} />
            <Route path="/register" element={<RegisterPage title='Регистрация'/>} />
            <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage title='Восстановление пароля' />} />} />
            <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage title='Восстановление пароля' />} />} />
            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage title='' />} />} />
            <Route path="/ingredients/:id" element={""} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

        </main>
      </ProvideAuth>
      </>
      );
      }

export default App;
