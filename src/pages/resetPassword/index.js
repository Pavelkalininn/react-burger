import loginStyles from './style.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchPasswordResetSubmit,
  removeState,
  setValue,
} from '../../services/slices/authorization';
export function ResetPasswordCard() {
  const dispatch = useDispatch();
  const { token, password, error, isError } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchPasswordResetSubmit({ password, token })).then((res) => {
      if (res.payload?.success) {
        dispatch(removeState());
        navigate('/');
        alert('Пароль успешно обновлён');
      }
    });
  };
  function handleChange(e) {
    dispatch(setValue({ key: e.target.name, value: e.target.value }));
  }

  useEffect(() => {
    console.log(location.state);
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
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={loginStyles.buttonField}
      >
        Сохранить
      </Button>
      <p className="text_type_main-small">
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </form>
  );
}
