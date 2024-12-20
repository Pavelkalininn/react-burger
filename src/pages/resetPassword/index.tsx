import loginStyles from './style.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  fetchPasswordResetSubmit,
  removeState,
  setValue, TAuthorizationInitialState,
} from '../../services/slices/authorization';
import { useAppDispatch, useAppSelector } from '../../hooks';
export function ResetPasswordCard() {
  const dispatch = useAppDispatch();
  const { token, password, error, isError } = useAppSelector(state => state.authorization);
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(fetchPasswordResetSubmit({ password, token })).then((res) => {
      if (res.payload?.success) {
        dispatch(removeState());
        navigate('/');
        alert('Пароль успешно обновлён');
      }
    });
  };
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as keyof TAuthorizationInitialState;
    dispatch(setValue({ key: key, value: e.target.value }));
  }

  useEffect(() => {
    if (location.state?.from?.pathname !== '/forgot-password') navigate('/forgot-password');
  }, [location.state, navigate]);
  return (
    <form onSubmit={onSubmit}>
      <PasswordInput
        onChange={handleChange}
        value={password}
        name={'password'}
        placeholder={'Введите новый пароль'}
        extraClass={cn('mb-2', loginStyles.inputField)}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={handleChange}
        icon={'CurrencyIcon'}
        value={token}
        name={'token'}
        error={isError}
        errorText={error}
        size={'default'}
        extraClass={cn('ml-1', loginStyles.inputField)}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <Button htmlType="submit" type="primary" size="large" extraClass={loginStyles.buttonField}>
        Сохранить
      </Button>
      <p className="text_type_main-small">
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </form>
  );
}
