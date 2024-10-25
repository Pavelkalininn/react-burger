import { useAuth } from '../services/auth';
import { Navigate, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProtectedRouteElement({ element }) {
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
    return null;
  }

  return auth.user ? element : <Navigate to="/login" replace/>;
}