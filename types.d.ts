import type Stripe from "stripe";

interface CustomProduct extends Stripe.Product {
    quantity: number;
}

export default CustomProduct;


export interface DropDownItem {
    name: string,
    link: string,
    image: string
    category: {
        name: string
    }
}

export interface Product {
    id: string,
    name: string,
    price: number,
    image: string,
    description: string,
    categoryId: string,
    subcategoryId: string,
    createdAt: Date,
    updatedAt: Date,
    categoryId: string,
    stock: number,
}