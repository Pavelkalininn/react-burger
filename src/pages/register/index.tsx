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
import {
  fetchRegister,
  setValue,
} from '../../services/slices/authorization';
import { ChangeEvent, FormEvent } from 'react';
import { AuthorizationType } from '../../types/burger';
export function RegisterCard() {
  const dispatch = useDispatch();
  const { email, password, name } = useSelector((state: AuthorizationType) => state.authorization);
  const navigate = useNavigate();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setValue({key: e.target.name, value: e.target.value}))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
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
