import { useState } from 'react';
import { createContext } from 'node:vm';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}


export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = cb => {
    return fakeAuth.signIn(() => {
      // Временные данные, которые будут доступны приложению
      setUser({ id: 1337, name: 'David' });
      cb();
    });
  };

  const signOut = cb => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signIn,
    signOut
  };
}