import { createSlice, configureStore } from "@reduxjs/toolkit";

import type CustomProduct from "types";



export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        //Get the items from local storage if there are any
        items: [] as CustomProduct[],
    },
    reducers: {
        initializeCart(state, action: { payload: CustomProduct[]; }) {


            state.items = action.payload;

        },
        addToCart(state, action: { payload: CustomProduct; }) {
            const item = action.payload;
            const existingItem = state.items.find((itemTemp) => itemTemp.default_price === item.default_price);

            if (existingItem === undefined) {


                state.items.push({
                    ...item,
                });
            }
            else {
                //iTEM ALREADY EXISTS



                existingItem.quantity++;
                //Replace the item in the array
                const tempItems = state.items.map((item) => {
                    if (item.default_price === existingItem.default_price) {
                        return existingItem;
                    }
                    return item;
                }
                );
                state.items = tempItems;

            }
        },
        updateCart(state, action: { payload: CustomProduct[] }) {
            const items = action.payload;
            state.items = items;
        },
        removeFromCart(state, action: { payload: CustomProduct; }) {
            const item = action.payload;
            const existingItem = state.items.find((itemTemp) => item.default_price === itemTemp.default_price);
            if (existingItem) {
                state.items = state.items.filter((itemTemp) => item.default_price !== itemTemp.default_price);
                //The item quantity is 1 so remove it from the array
            }
        },
        clearCart(state) {
            state.items = [];
        }
    },
});



const store = configureStore({
    reducer: shoppingCartSlice.reducer,
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const { clearCart, addToCart, removeFromCart, initializeCart } = shoppingCartSlice.actions;