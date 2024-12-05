import authorizationsReducer, {
  authorizationInitialState,
  fetchRegister,
  setIsAuthChecked,
  removeState,
  setValue,
  cookies,
  fetchToken,
  fetchLogout,
  fetchUser,
  updateUser,
  fetchPasswordReset,
  fetchPasswordResetSubmit,
} from './authorization';



describe('authorizationSlice', () => {
  it('should return the initial state', () => {
    expect(authorizationsReducer(undefined, { type: "undefined" })).toEqual(authorizationInitialState);
  });

  it('should handle setValue', () => {
    const previousState = { ...authorizationInitialState, name: '' };
    const action = setValue({ key: 'name', value: 'John Doe' });
    const expectedState = { ...previousState, name: 'John Doe' };

    expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
  });

  it('should handle removeState', () => {
    const previousState = { ...authorizationInitialState, name: 'John Doe' };
    const action = removeState();
    const expectedState = { ...authorizationInitialState, isAuthChecked: true };

    expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
  });

  it('should handle setIsAuthChecked', () => {
    const previousState = { ...authorizationInitialState };
    const action = setIsAuthChecked(true);
    const expectedState = { ...previousState, isAuthChecked: true };

    expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
  });

  describe('extra reducers - fetchLogin', () => {
    it('should handle fetchRegister.pending', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchRegister.pending.type };
      const expectedState = { ...previousState, isLoading: true };

      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchRegister.fulfilled', () => {
      const previousState = { ...authorizationInitialState, isLoading: true };
      const action = {
        type: fetchRegister.fulfilled.type,
        payload: { success: true, refreshToken: 'refreshToken', accessToken: 'accessToken' },
      };
      const expectedState = {
        ...previousState,
        isLoading: false,
        isFetched: true,
        isSuccess: true,
        isAuthChecked: true,
      };

      jest.spyOn(cookies, 'set');
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
      expect(cookies.set).toHaveBeenCalledWith('refreshToken', 'refreshToken');
      expect(cookies.set).toHaveBeenCalledWith('accessToken', 'accessToken');
    });
    it('should handle fetchRegister.rejected', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchRegister.rejected.type, error: { message: 'error' } };
      const expectedState = { ...previousState, isError: true, error: "error"};

      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
  });

  describe('extra reducers - fetchToken', () => {
    it('should handle fetchToken.pending', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchToken.pending.type };
      const expectedState = { ...previousState, isLoading: true };

      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchToken.fulfilled', () => {
      const previousState = { ...authorizationInitialState, isLoading: true };
      const action = {
        type: fetchToken.fulfilled.type,
        payload: { success: true, refreshToken: 'refreshToken', accessToken: 'accessToken' },
      };
      const expectedState = {
        ...previousState,
        isLoading: false,
        isFetched: true,
        isSuccess: true,
        isAuthChecked: true,
      };

      jest.spyOn(cookies, 'set');
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
      expect(cookies.set).toHaveBeenCalledWith('refreshToken', 'refreshToken');
      expect(cookies.set).toHaveBeenCalledWith('accessToken', 'accessToken');
    });
    it('should handle fetchToken.rejected', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchToken.rejected.type, error: { message: 'error' } };
      const expectedState = { ...previousState, isError: true, error: "error"};

      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
  });


  describe('extra reducers - fetchLogout', () => {
    it('should handle fetchLogout.pending', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchLogout.pending.type };
      const expectedState = { ...previousState, isLoading: true };

      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchLogout.fulfilled', () => {
      const previousState = { ...authorizationInitialState, isLoading: true };
      const action = {
        type: fetchLogout.fulfilled.type,
        payload: { success: true },
      };
      const expectedState = {
        ...authorizationInitialState,
        isLoading: false,
        isFetched: true,
        isSuccess: true,
        isAuthChecked: true,
      };

      jest.spyOn(cookies, 'remove');
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
      expect(cookies.remove).toHaveBeenCalledWith('refreshToken');
      expect(cookies.remove).toHaveBeenCalledWith('accessToken');
    });
    it('should handle fetchLogout.rejected', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchLogout.rejected.type, error: { message: 'error' } };
      const expectedState = { ...previousState, isError: true, error: "error"};
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
  });


  describe('extra reducers - fetchUser', () => {
    it('should handle fetchUser.pending', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchUser.pending.type };
      const expectedState = { ...previousState, isLoading: true };

      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchUser.fulfilled', () => {
      const previousState = { ...authorizationInitialState, isLoading: true };
      const action = {
        type: fetchUser.fulfilled.type,
        payload: {
          "success": true,
          "user": {
            "email": "m@ya.ru",
            "name": "Mya"
          }
        },
      };
      const expectedState = {
        ...previousState,
        isLoading: false,
        isFetched: true,
        isSuccess: true,
        isAuthChecked: true,
        name: "Mya",
        email: "m@ya.ru",
        user: {"email": "m@ya.ru", "name": "Mya"}
      };
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
    it('should handle fetchUser.rejected', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchUser.rejected.type, error: { message: 'error' } };
      const expectedState = { ...previousState, isError: true, error: "error"};
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
  });

  describe('extra reducers - updateUser', () => {
    it('should handle updateUser.pending', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: updateUser.pending.type };
      const expectedState = { ...previousState, isLoading: true };

      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle updateUser.fulfilled', () => {
      const previousState = { ...authorizationInitialState, isLoading: true };
      const action = {
        type: updateUser.fulfilled.type,
        payload: {
          "success": true,
          "user": {
            "email": "m@ya.ru",
            "name": "Mya"
          }
        },
      };
      const expectedState = {
        ...previousState,
        isLoading: false,
        isFetched: true,
        isSuccess: true,
        isAuthChecked: true,
        user: {"email": "m@ya.ru", "name": "Mya"}
      };
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
    it('should handle updateUser.rejected', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: updateUser.rejected.type, error: { message: 'error' } };
      const expectedState = { ...previousState, isError: true, error: "error"};
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
  });

  describe('extra reducers - fetchPasswordReset', () => {
    it('should handle fetchPasswordReset.pending', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchPasswordReset.pending.type };
      const expectedState = { ...previousState, isLoading: true };
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchPasswordReset.fulfilled', () => {
      const previousState = { ...authorizationInitialState, isLoading: true };
      const action = {
        type: fetchPasswordReset.fulfilled.type,
        payload: {"success": true},
      };
      const expectedState = {
        ...previousState,
        isLoading: false,
        isFetched: true,
        isSuccess: true
      };
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
    it('should handle fetchPasswordReset.rejected', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchPasswordReset.rejected.type, error: { message: 'error' } };
      const expectedState = { ...previousState, isError: true, error: "error"};
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
  });


  describe('extra reducers - fetchPasswordResetSubmit', () => {
    it('should handle fetchPasswordReset.pending', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchPasswordResetSubmit.pending.type };
      const expectedState = { ...previousState, isLoading: true };
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchPasswordResetSubmit.fulfilled', () => {
      const previousState = { ...authorizationInitialState, isLoading: true };
      const action = {
        type: fetchPasswordResetSubmit.fulfilled.type,
        payload: {"success": true},
      };
      const expectedState = {
        ...previousState,
        isLoading: false,
        isFetched: true,
        isSuccess: true
      };
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
    it('should handle fetchPasswordResetSubmit.rejected', () => {
      const previousState = { ...authorizationInitialState };
      const action = { type: fetchPasswordResetSubmit.rejected.type, error: { message: 'error' } };
      const expectedState = { ...previousState, isError: true, error: "error"};
      expect(authorizationsReducer(previousState, action)).toEqual(expectedState);
    });
  });

});