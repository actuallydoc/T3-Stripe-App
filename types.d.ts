import Stripe from "stripe";
import { TypeOf } from "zod";


export type CartItem = TypeOf<typeof Stripe.Product>;
export type Cart = CartItem[];


