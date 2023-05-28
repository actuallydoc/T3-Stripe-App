import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});

export const ShoppingCardItem = z.object({
    quantity: z.number().int().positive(),
    id: z.string(),
    default_price: z.string(),
});

export const paymentRouter = createTRPCRouter({

    createCheckout: protectedProcedure.input(z.object({ products: ShoppingCardItem.array() })).mutation(({ input }) => {
        return stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card", "paypal"],
            shipping_address_collection: {
                allowed_countries: ["SI"],
            },

            line_items: [
                ...ShoppingCardItem.array().parse(input.products).map((product) => ({
                    price: product.default_price,
                    quantity: product.quantity,
                })),
            ],
            success_url: `${process.env.NEXTAUTH_URL as string}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL as string}/`,
        })
    }),
    getStripeSession: publicProcedure.input(z.object({ sessionId: z.string() }))
        .query(async ({ input }) => {
            const session = await stripe.checkout.sessions.retrieve(input.sessionId);
            return {
                email: session.customer_details?.email,
            };
        }),

});