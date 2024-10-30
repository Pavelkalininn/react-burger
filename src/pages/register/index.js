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
  fetchLogin,
  fetchRegister,
  setValue,
} from '../../services/slices/authorization';
export function RegisterCard() {
  const dispatch = useDispatch();
  const { email, password, name, isError, error } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  function handleChange(e) {
    dispatch(setValue({key: e.target.name, value: e.target.value}))
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(fetchRegister({email, password, name}))
      .then((res) => {
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
        htmlType="submit"
        type="primary"
        size="large"
        extraClass={loginStyles.buttonField}
      >
        Зарегистрироваться
      </Button>
      <p className='text_type_main-small'>
        Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
      </p>
    </form>
  );
}
