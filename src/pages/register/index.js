import loginStyles from './style.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRegister, setValue } from '../../services/slices/authorization';
export function RegisterCard() {
  const dispatch = useDispatch();
  const { email, password, name, isSuccess, isError, error } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/login');

    }
  }, [isSuccess, dispatch, navigate]);

  function handleChange(e) {
    dispatch(setValue({key: e.target.name, value: e.target.value}))
  }


  return (
    <>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        icon={'CurrencyIcon'}
        value={name}
        name={'name'}
        onIconClick={"onIconClick"}
        size={'default'}
        extraClass={cn('ml-1', loginStyles.inputField)}
      />
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
        onClick={() => dispatch(fetchRegister({email, password, name}))}
        extraClass={loginStyles.buttonField}
      >
        Зарегистрироваться
      </Button>
      <p className='text_type_main-small'>
        Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
      </p>
    </>
  );
}
