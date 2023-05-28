

import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});

export const productsRouter = createTRPCRouter({
    getAll: publicProcedure
        .query(async () => {
            const products = await stripe.products.list();
            return {
                products: products.data,
            };
        }),

});
