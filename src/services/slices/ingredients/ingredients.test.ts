import ingredientsSliceReducer, {
  initialState,
  fetchIngredients,
} from '../ingredients';


const ingredient = {
  _id: 'set',
  name: 'cos',
  type: 'bun',
  proteins: 1123,
  fat: 1245,
  carbohydrates: 231,
  calories: 231,
  price: 2442,
  image: 'image',
  image_mobile: 'image_mobile',
  image_large: 'image_large',
  __v: 234342,
  uuid: 'kok'
}


const ingredient_second = {
  _id: 'set2',
  name: 'cos2',
  type: 'bun2',
  proteins: 11231,
  fat: 12451,
  carbohydrates: 2312,
  calories: 2321,
  price: 24442,
  image: 'image5',
  image_mobile: 'image_mobile5',
  image_large: 'image_large5',
  __v: 2343429,
  uuid: 'kek'
}


describe('ingredientsSlice', () => {
  it('should return the initial state', () => {
    expect(ingredientsSliceReducer(undefined, { type: "undefined" })).toEqual(initialState);
  });
  describe('extra reducers - fetchIngredients', () => {
    it('should handle fetchIngredients.pending', () => {
      const previousState = { ...initialState };
      const action = { type: fetchIngredients.pending.type };
      const expectedState = { ...previousState, isLoading: true };

      expect(ingredientsSliceReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchIngredients.fulfilled', () => {
      const previousState = { ...initialState, isLoading: true };
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: {
          data: [
            ingredient, ingredient_second
          ]
        },
      };
      const expectedState = {
        ...previousState,
        isLoading: false,
        isFetched: true,
        ingredients: [ingredient, ingredient_second],
      };
      expect(ingredientsSliceReducer(previousState, action)).toEqual(expectedState);
    });
    it('should handle fetchIngredients.rejected', () => {
      const previousState = { ...initialState };
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: 'error' }
      };
      const expectedState = {
        ...previousState,
        isError: true,
        error: "error"
      };
      expect(ingredientsSliceReducer(previousState, action)).toEqual(expectedState);
    });
  });
});