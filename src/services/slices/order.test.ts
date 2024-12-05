import orderNumberSliceReducer, {
  fetchOrder,
  initialState,
  removeOrder
} from './order';

describe('orderNumberSlice', () => {
  it('should return the initial state', () => {
    expect(orderNumberSliceReducer(undefined, { type: "undefined" })).toEqual(initialState);
  });
  describe('extra reducers - fetchOrder', () => {
    it('should handle fetchOrder.pending', () => {
      const previousState = { ...initialState };
      const action = { type: fetchOrder.pending.type };
      const expectedState = { ...previousState, isLoading: true };
      expect(orderNumberSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchOrder.fulfilled', () => {
      const previousState = { ...initialState, isLoading: true };
      const action = {
        type: fetchOrder.fulfilled.type,
        payload: {
          order: {
            number: 5566778
          },
          success: true
        },
      };
      const expectedState = {
        ...previousState,
        isLoading: false,
        isFetched: true,
        isSuccess: true,
        number: 5566778
      };
      expect(orderNumberSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchOrder.rejected', () => {
      const previousState = { ...initialState };
      const action = {
        type: fetchOrder.rejected.type,
        error: { message: 'error' }
      };
      const expectedState = {
        ...previousState,
        isError: true,
        error: "error"
      };
      expect(orderNumberSliceReducer(previousState, action)).toEqual(expectedState);
    });
    it('should handle removeOrder', () => {
      const previousState = { ...initialState, number: 5566778 };
      const action = removeOrder();
      const expectedState = { ...initialState };
      expect(orderNumberSliceReducer(previousState, action)).toEqual(expectedState);
    });
  });
});