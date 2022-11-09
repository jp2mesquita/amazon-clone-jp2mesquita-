import { createSlice } from "@reduxjs/toolkit";

interface ItemProps{
    id: number
    title: string
    price: number 
    description: string 
    category: string 
    image: string
    rating: number
    hasPrime: boolean
}

interface ItemsProps{
  items: ItemProps[]
}

const initialState: ItemsProps = {
  items: []
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers:{
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action )=> {
 
      const index = state.items.findIndex(basketItem => basketItem.id  === action.payload.id)

      let newBasket = [...state.items]

      if(index >= 0){
        newBasket.splice(index, 1)
        state.items = newBasket
      }else{
        console.warn(
          `Cant remove product (id: ${action.payload.id} as it's not in the basket)`
        )
      }
    }
  }
})

export const { addToBasket, removeFromBasket} = basketSlice.actions

export const selectItems = (state: { basket: { items: ItemProps[]; }; }) => state.basket.items
export const selectTotal =  (state: { basket: { items: ItemProps[]; }; }) => 
  state.basket.items.reduce((total, item) => total + item.price,0)

export default basketSlice.reducer