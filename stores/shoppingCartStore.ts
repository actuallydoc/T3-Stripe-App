import { createSlice, configureStore } from "@reduxjs/toolkit";
import Stripe from "stripe";



export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        //Get the items from local storage if there are any
        items: JSON.parse(localStorage.getItem("storeCart") || "[]") as Stripe.Product[],
    },
    reducers: {
        addToCart(state, action: { payload: Stripe.Product; }) {
            const item = action.payload;
            const existingItem = state.items.find((item) => item.id === item.id);
            if (!existingItem) {
                state.items.push({
                    ...item,
                });
            }
            else {

                //existingItem.quantity++;
            }
        },
        removeFromCart(state, action: { payload: Stripe.Product; }) {
            const id = action.payload.default_price;
            const existingItem = state.items.find((item) => item.default_price === id);
            if (existingItem) {
                /*
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter((item) => item.id !== id);
                }
                else {
                    existingItem.quantity--;
                }
                */
            }
        },
        clearCart(state) {
            state.items = [];
        }
    },
});

export const { clearCart, addToCart, removeFromCart } = shoppingCartSlice.actions;