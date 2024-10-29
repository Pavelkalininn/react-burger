import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Button,
  EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './style.module.css';
import cn from 'classnames';
import {
  fetchLogout,
  removeState,
  setValue,
} from '../../services/slices/authorization';

export function ProfilePageCard() {
  const dispatch = useDispatch();
  const { email, password, name, isSuccess } = useSelector((state) => state.authorization);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate('/reset-password');
  //     dispatch(removeState())
  //   }
  // }, [isSuccess, dispatch, navigate]);

  function handleChange(e) {
    dispatch(setValue({key: e.target.name, value: e.target.value}))
  }
  
  return (
    <>
      <div className={profileStyles.grid}>
        <div className={cn('text text_type_main-medium', profileStyles.menu)}>
          <NavLink
            to={'/profile'}
            className={({ isActive }) => (isActive ? profileStyles.activeHref : profileStyles.href)}
          >
            <p>Профиль</p>
          </NavLink>
          <NavLink
            to={'/profile/orders'}
            className={({ isActive }) => (isActive ? profileStyles.activeHref : profileStyles.href)}
          >
            <p>История заказов</p>
          </NavLink>
          <NavLink
            to={'/'}
            onClick={() => dispatch(fetchLogout())}
            className={({ isActive }) => (isActive ? profileStyles.activeHref : profileStyles.href)}
          >
            <p>Выход</p>
          </NavLink>
          <p className={cn('text text_type_main-default', profileStyles.info)}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            icon={'EditIcon'}
            value={name}
            name={'name'}
            error={false}
            onIconClick={'onIconClick'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={cn('ml-1', profileStyles.inputField)}
          />
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={handleChange}
            icon={'EditIcon'}
            value={email}
            name={'name'}
            error={false}
            onIconClick={'onIconClick'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={cn('ml-1', profileStyles.inputField)}
          />
          <PasswordInput
            onChange={handleChange}
            icon={'EditIcon'}
            value={password}
            name={'password'}
            extraClass={cn('mb-2', profileStyles.inputField)}
          />
        </div>
      </div>
    </>
  );
}