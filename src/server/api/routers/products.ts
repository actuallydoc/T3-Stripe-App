

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
            //You can get products from stripe here and return them how ever you want
            const products = await stripe.products.list();
            return {
                products: products.data,
            };
        }),

    getOne: publicProcedure
        .input(z.object({ id: z.string() })).query(async ({ input }) => {
            const product = await stripe.products.retrieve(input.id);
            if (!product) {
                throw new Error("Product not found");
            }
            return {
                product,
            };
        }
        ),

});
