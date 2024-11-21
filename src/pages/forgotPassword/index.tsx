import loginStyles from './style.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchPasswordReset,
  removeState,
  setValue, TAuthorizationInitialState,
} from '../../services/slices/authorization';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
export function ForgotPasswordCard() {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(state=> state.authorization);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(fetchPasswordReset({ email })).then((res) => {
      if (res.payload.success) {
        dispatch(removeState());
        navigate('/reset-password', { state: { from: { pathname: '/forgot-password' } } });
      }
    });
  };
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as keyof TAuthorizationInitialState;
    dispatch(setValue({ key: key, value: e.target.value }));
  }
  return (
    <form onSubmit={onSubmit}>
      <EmailInput
        onChange={handleChange}
        name="email"
        value={email}
        isIcon={false}
        extraClass={loginStyles.inputField}
      />

      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={loginStyles.buttonField}
      >
        Восстановить
      </Button>
      <p className="text_type_main-small">
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </form>
  );
}
