import type Stripe from "stripe";

interface CustomProduct extends Stripe.Product {
    quantity: number;
}

export default CustomProduct;


export interface DropDownItem {
    name: string,
    link: string,
    image: string
}