
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

export type BurgerConstructorIngredientType = {
  pk: number,
  item: IngredientType,
  type: "top" | "bottom" | undefined,
}