import ordersSliceReducer, {
  removeOrdersState,
  startConnection,
  connectionEstablished,
  connectionError,
  getMessage,
  closeConnection,
  setCurrentOrder,
  dropCurrentOrder,
  sendOrder,
  fetchCurrentOrder,
  initialState,
} from '../orders';
import { TOrderCard } from '../../../types/order';

const  order: TOrderCard = {
  _id: 'pepr',
  ingredients: ['kek', 'pop', 'lol', 'cer'],
  owner: 'Pkal',
  status: 'success',
  name: 'order name',
  createdAt: "2024-12-06T09:34:53.457Z",
  updatedAt: "2024-12-06T09:34:54.393Z",
  number: 646345,
  __v: 36346
}

const totalCount = 1234
const totalTodayCount = 2314
const orders = [order, order]

describe('ordersSlice', () => {
  it('should return the initial state', () => {
    expect(ordersSliceReducer(undefined, { type: "undefined" })).toEqual(initialState);
  });
  describe('extra reducers - fetchCurrentOrder', () => {
    it('should handle fetchCurrentOrder.fulfilled', () => {
      const action = {
        type: fetchCurrentOrder.fulfilled.type,
        payload: {
          orders: [order],
          success: true
        },
      };
      const expectedState = {
        ...initialState,
        currentOrder: order
      };
      expect(ordersSliceReducer(initialState, action)).toEqual(expectedState);
    });


    it('should handle removeOrdersState', () => {
      const previousState = { ...initialState, currentOrder: order, orderFeed: orders};
      const action = removeOrdersState();
      const expectedState = { ...initialState };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle startConnection', () => {
      const previousState = { ...initialState};
      const action = startConnection("http://localhost:8080");
      const expectedState = { ...initialState, isEstablishingConnection: true };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle connectionEstablished', () => {
      const previousState = { ...initialState };
      const action = connectionEstablished();
      const expectedState = {
        ...initialState,
        isConnected: true,
        isEstablishingConnection: true
      };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle connectionError', () => {
      const previousState = { ...initialState };
      const action = connectionError('error');
      const expectedState = {
        ...initialState,
        isConnected: false,
        isEstablishingConnection: false,
        error: 'error'
      };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle getMessage', () => {
      const previousState = { ...initialState };
      const action = getMessage(
        JSON.stringify({
          orders: orders,
          total: totalCount,
          totalToday: totalTodayCount
        })
      );
      const expectedState = {
        ...initialState,
        orderFeed: orders,
        total: totalCount,
        totalToday: totalTodayCount
      };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle closeConnection', () => {
      const previousState = {
        ...initialState,
        orderFeed: orders,
        total: totalCount,
        totalToday: totalTodayCount
      };
      const action = closeConnection();
      const expectedState = { ...initialState };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle setCurrentOrder', () => {
      const previousState = { ...initialState };
      const action = setCurrentOrder(order);
      const expectedState = { ...initialState, currentOrder: order };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle dropCurrentOrder', () => {
      const previousState = { ...initialState, currentOrder: order };
      const action = dropCurrentOrder();
      const expectedState = { ...initialState };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle sendOrder', () => {
      const previousState = { ...initialState };
      const action = sendOrder(order);
      const expectedState = {
        ...initialState,
        isConnected: true,
        isEstablishingConnection: true,
      };
      expect(ordersSliceReducer(previousState, action)).toEqual(expectedState);
    });
  });
});