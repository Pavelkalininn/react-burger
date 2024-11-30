import { NavLink, useLocation } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './style.module.css';
import cn from 'classnames';
import {
  fetchLogout,
  setValue,
  TAuthorizationInitialState,
  updateUser,
} from '../../services/slices/authorization';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { OrderFeed } from '../../components/orderFeed';

export function ProfilePageCard() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { email, password, name } = useAppSelector((state) => state.authorization);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as keyof TAuthorizationInitialState;
    dispatch(setValue({ key: key, value: e.target.value }));
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(updateUser({ email, name, password }));
  }

  return (
    <>
      <div className={profileStyles.grid}>
        <div className={cn('text text_type_main-medium', profileStyles.menu)}>
          <NavLink
            to={'/profile'}
            className={location.pathname === '/profile' ? profileStyles.activeHref : profileStyles.href}
          >
            <p>Профиль</p>
          </NavLink>
          <NavLink
            to={'/profile/orders'}
            className={location.pathname === '/profile/orders' ? profileStyles.activeHref : profileStyles.href}
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
        {location.pathname === '/profile' ? (
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
        ) : (
          <div className={profileStyles.orderFeedContainer}>
            <OrderFeed onlyMy={true} />
          </div>
        )}
      </div>
    </>
  );
}
