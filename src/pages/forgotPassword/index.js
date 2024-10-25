import loginStyles from './style.module.css';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPasswordReset, removeState,
  setEmail,
} from '../../services/slices/passwordReset';
import { useEffect } from 'react';
export function ForgotPasswordCard() {
  const dispatch = useDispatch();
  const { isSuccess, email } = useSelector((state) => state.passwordResetSlice);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/reset-password');
      dispatch(removeState())
    }
  }, [isSuccess, dispatch, navigate]);
  return (
    <>
      <EmailInput
        onChange={(e) => dispatch(setEmail(e.target.value))}
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
        onClick={() => dispatch(fetchPasswordReset(email))}
      >
        Восстановить
      </Button>
      <p className="text_type_main-small">
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </>
  );
}
