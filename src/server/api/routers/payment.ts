import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
});

export const paymentRouter = createTRPCRouter({

    createCheckout: protectedProcedure.mutation(() => {

        return stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: process.env.PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXTAUTH_URL as string}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL as string}/cancel`,
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