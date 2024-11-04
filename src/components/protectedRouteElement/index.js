
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRouteElement({ onlyUnAuth = false, element }) {
  const { user, isAuthChecked } = useSelector((state) => state.authorization);
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
export const OnlyUnAuth = ({element}) => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);
