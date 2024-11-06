
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactElement } from 'react';
import { AuthorizationType } from '../../types/burger';

export function ProtectedRouteElement({ onlyUnAuth = false, element }: {onlyUnAuth?: boolean; element: ReactElement}): ReactElement {
  const { user, isAuthChecked } = useSelector((state: AuthorizationType) => state.authorization);
  const location = useLocation();

  if (!isAuthChecked) {
    return <p>Загрузка...</p>;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  return element;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({element}: {element: ReactElement}) => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);
