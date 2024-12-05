import currentIngredientsReducer, {
  chooseIngredient, dropIngredient, initialState
} from './currentIngredient';

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

describe('authorizationSlice', () => {
  it('should return the initial state', () => {
    expect(currentIngredientsReducer(undefined, { type: 'undefined' })).toEqual(initialState);
  });
  it('should handle addIngredientToBurger', () => {
    const previousState = null;
    const action = chooseIngredient(ingredient);
    const expectedState = { ...ingredient };
    expect(currentIngredientsReducer(previousState, action)).toEqual(expectedState);
  });
  it('should handle dropIngredientFromBurger', () => {
    const previousState = ingredient;
    const action = dropIngredient();
    const expectedState = null;
    expect(currentIngredientsReducer(previousState, action)).toEqual(expectedState);
  });  
});