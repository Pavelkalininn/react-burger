import loginStyles from './style.module.css';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import {
  fetchLogin,
  setValue,
  TAuthorizationInitialState,
} from '../../services/slices/authorization';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
export function LoginPageCard() {
  const dispatch = useAppDispatch();
  const { email, password, isSuccess } = useAppSelector(
    state => state.authorization,
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as keyof TAuthorizationInitialState;
    dispatch(setValue({ key: key, value: e.target.value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
