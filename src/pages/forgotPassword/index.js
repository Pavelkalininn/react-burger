import loginStyles from './style.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPasswordReset, removeState, setValue } from '../../services/slices/authorization';
export function ForgotPasswordCard() {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.authorization);
  const navigate = useNavigate();

  const onSubmit = () => {
    dispatch(fetchPasswordReset({ email })).then((res) => {
      console.log(res);
      if (res.payload.success) {
        dispatch(removeState());
        navigate('/reset-password', { state: { from: { pathname: '/forgot-password' } } });
      }
    });
  };
  function handleChange(e) {
    dispatch(setValue({ key: e.target.name, value: e.target.value }));
  }
  return (
    <>
      <EmailInput
        onChange={handleChange}
        name="email"
        value={email}
        isIcon={false}
        extraClass={loginStyles.inputField}
      />

      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass={loginStyles.buttonField}
        onClick={onSubmit}
      >
        Восстановить
      </Button>
      <p className="text_type_main-small">
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </>
  );
}
