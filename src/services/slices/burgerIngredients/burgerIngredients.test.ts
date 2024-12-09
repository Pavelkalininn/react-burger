import burgerIngredients, {
  removeIngredients,
  addIngredientToBurger,
  dropIngredientFromBurger,
  addBunToBurger,
  moveIngredient,
  InitialState
} from '../burgerIngredients';

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

describe('authorizationSlice', () => {
  it('should return the initial state', () => {
    expect(burgerIngredients(undefined, { type: 'undefined' })).toEqual(InitialState);
  });
  it('should handle addIngredientToBurger', () => {
    const previousState = { ...InitialState };
    const action = addIngredientToBurger({ ingredient });
    const expectedState = { ...previousState, ingredients: [{ ...ingredient, uuid:  expect.anything()}] };
    expect(burgerIngredients(previousState, action)).toEqual(expectedState);
  });
  it('should handle dropIngredientFromBurger', () => {
    const previousState = {
      ...InitialState,
      ingredients: [ingredient, ingredient_second]
    };
    const action = dropIngredientFromBurger("kok");
    const expectedState = { ...InitialState, ingredients: [ingredient_second]};
    expect(burgerIngredients(previousState, action)).toEqual(expectedState);
  });
  it('should handle addBunToBurger', () => {
    const previousState = { ...InitialState };
    const action = addBunToBurger({ ingredient });
    const expectedState = { ...previousState, bun: { ...ingredient, uuid:  expect.anything()} };
    expect(burgerIngredients(previousState, action)).toEqual(expectedState);
  });
  it('should handle moveIngredient', () => {
    const previousState = { bun: ingredient, ingredients: [ingredient, ingredient_second]};
    const action = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
    const expectedState = { bun: ingredient, ingredients: [ingredient_second, ingredient] };
    expect(burgerIngredients(previousState, action)).toEqual(expectedState);
  });
  it('should handle removeIngredients', () => {
    const previousState = { bun: ingredient, ingredients: [ingredient, ingredient_second]};
    const action = removeIngredients();
    const expectedState = { ...InitialState};
    expect(burgerIngredients(previousState, action)).toEqual(expectedState);
  });
});