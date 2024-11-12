import loginStyles from './style.module.css';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, setValue } from '../../services/slices/authorization';
import { AuthorizationType } from '../../types/burger';
import { ChangeEvent, FormEvent } from 'react';
export function LoginPageCard() {
  const dispatch = useDispatch();
  const { email, password, isSuccess, isAuthChecked } = useSelector(
    (state: AuthorizationType) => state.authorization,
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setValue({ key: e.target.name, value: e.target.value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
    dispatch(fetchLogin({ password, email })).then(() => isSuccess && navigate(from))
  }

  return (
    <form onSubmit={onSubmit}>
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
      />
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        extraClass={loginStyles.buttonField}
      >
        Войти
      </Button>
      <p className="text_type_main-small">
        Вы - новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
      </p>
      <p className="text_type_main-small">
        Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
      </p>
    </form>
  );
}
