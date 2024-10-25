import loginStyles from './style.module.css';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchLogin,
  setValue,
} from '../../services/slices/authorization';
export function LoginPageCard() {
  const dispatch = useDispatch();
  const { email, password, isSuccess, isError, error } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/');

    }
  }, [isSuccess, dispatch, navigate]);

  function handleChange(e) {
    dispatch(setValue({key: e.target.name, value: e.target.value}))
  }

  if (auth.user) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <>
      <EmailInput
        onChange={handleChange}
        value={email}
        name={'email'}
        isIcon={false}
        extraClass={loginStyles.inputField}
      />
      <PasswordInput
        onChange={handleChange}
        value={password}
        name={'password'}
        extraClass={cn('mb-2', loginStyles.inputField)}
        isError={isError}
        error={error}
      />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass={loginStyles.buttonField}
        onClick={() => dispatch(fetchLogin({password, email}))}
      >
        Войти
      </Button>
      <p className="text_type_main-small">
        Вы - новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
      </p>
      <p className="text_type_main-small">
        Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
      </p>
    </>
  );
}
