
export type IngredientType = {
  _id:string,
  name:string,
  type:string,
  proteins:number,
  fat:number,
  carbohydrates:number,
  calories:number,
  price:number,
  image:string,
  image_mobile:string,
  image_large:string,
  __v:number,
  uuid?:string
}

export type BurgerIngredientsSliceType = {
  burgerIngredientsSlice: {
    ingredients: ReadonlyArray<IngredientType>,
    bun: IngredientType
  }
}
export type ingredientsSliceType = {
  ingredientsSlice: {
    ingredients: Array<IngredientType>,
    isLoading: boolean,
    isFetched: boolean,
    isError: boolean,
    error: string,

  }
}

export type currentIngredientSliceType = {
  currentIngredientSlice: IngredientType | null
}

export type OrderNumberSliceType = {
  orderNumberSlice: {
    number: number | null,
    isLoading: boolean,
    isFetched: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: string,
  }
}

export type AuthorizationType = {
  authorization: {
    email: string,
    password: string,
    name: string,
    user: string,
    token: string,
    isAuthChecked: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isFetched: boolean,
    isError: boolean,
    error: string
  }
}

export type BurgerConstructorIngredientType = {
  pk: number,
  item: IngredientType,
  type: "top" | "bottom" | undefined,
}