import loginStyles from './style.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import {
  fetchRegister,
  setValue, TAuthorizationInitialState,
} from '../../services/slices/authorization';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
export function RegisterCard() {
  const dispatch = useAppDispatch();
  const { email, password, name } = useAppSelector(state => state.authorization);
  const navigate = useNavigate();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as keyof TAuthorizationInitialState;
    dispatch(setValue({ key: key, value: e.target.value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(fetchRegister({email, password, name})).then((res) => {
          if (res.payload.success) navigate('/login')
        }
      )
  }


  return (
    <form onSubmit={onSubmit}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        icon={'CurrencyIcon'}
        value={name}
        name={'name'}
        size={'default'}
        extraClass={cn('ml-1', loginStyles.inputField)}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
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
      />
      <Button htmlType="submit" type="primary" size="large" extraClass={loginStyles.buttonField}>
        Зарегистрироваться
      </Button>
      <p className="text_type_main-small">
        Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
      </p>
    </form>
  );
}
