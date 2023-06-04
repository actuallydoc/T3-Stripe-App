import type Stripe from "stripe";

interface CustomProduct extends Stripe.Product {
    quantity: number;
}
export interface CartItem {
    default_price: string;
    image: string;
    quantity: number;
    price: number;
    name: string;
    description: string;
}
export default CustomProduct;


