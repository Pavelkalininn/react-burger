import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './style.module.css';
import cn from 'classnames';
import {
  fetchLogout,
  setValue,
  updateUser,
} from '../../services/slices/authorization';
import { ChangeEvent, FormEvent } from 'react';
import { AuthorizationType } from '../../types/burger';

export function ProfilePageCard() {
  const dispatch = useDispatch();
  const { email, password, name } = useSelector((state: AuthorizationType) => state.authorization);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setValue({ key: e.target.name, value: e.target.value }));
  }
  function onSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
    dispatch(updateUser({ email, name, password }))
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
            onClick={() => // @ts-ignore
               dispatch(fetchLogout())
          }
            className={({ isActive }) => (isActive ? profileStyles.activeHref : profileStyles.href)}
          >
            <p>Выход</p>
          </NavLink>
          <p className={cn('text text_type_main-default', profileStyles.info)}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            icon={'EditIcon'}
            value={name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={cn('ml-1', profileStyles.inputField)}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={handleChange}
            icon={'EditIcon'}
            value={email}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={cn('ml-1', profileStyles.inputField)}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <PasswordInput
            onChange={handleChange}
            icon={'EditIcon'}
            value={password}
            name={'password'}
            extraClass={cn('mb-2', profileStyles.inputField)}
          />
        </form>
      </div>
    </>
  );
}
