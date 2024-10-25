import loginStyles from './style.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchPasswordResetSubmit,
  removePasswordResetSubmitState, setPassword, setToken,
} from '../../services/slices/passwordResetSubmit';
export function ResetPasswordCard() {
  const dispatch = useDispatch();
  const { isSuccess, token, password, error, isError } = useSelector((state) => state.passwordResetSubmitSlice);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      dispatch(removePasswordResetSubmitState())
      alert('Пароль успешно обновлён');
    }
  }, [isSuccess, dispatch, navigate]);
  return (
    <>
      <PasswordInput
        onChange={(e) => dispatch(setPassword(e.target.value))}
        value={password}
        name={'password'}
        placeholder={'Введите новый пароль'}
        extraClass={cn('mb-2', loginStyles.inputField)}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={(e) => dispatch(setToken(e.target.value))}
        icon={'CurrencyIcon'}
        value={token}
        name={'token'}
        error={isError}
        errorText={error}
        size={'default'}
        extraClass={cn('ml-1', loginStyles.inputField)}
      />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass={loginStyles.buttonField}
        onClick={() => dispatch(fetchPasswordResetSubmit({password, token}))}
      >
        Сохранить
      </Button>
      <p className='text_type_main-small'>
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </>
  );
}
