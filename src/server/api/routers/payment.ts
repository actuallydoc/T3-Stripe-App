import { TypeOf, z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});
export const CartItemZod = z.object({
    default_price: z.string(),
    image: z.string(),
    quantity: z.number(),
    price: z.number(),
    name: z.string(),
    description: z.string(),
});
const label: Stripe.Checkout.SessionCreateParams.CustomField.Label = {
    custom: "Shipping Method",
    type: "custom",
}
const DropDownOption: Stripe.Checkout.SessionCreateParams.CustomField.Dropdown.Option[] = [{
    label: "Standard",
    value: "StandardShipping",
},
{
    label: "Express",
    value: "ExpressShipping",
},
{
    label: "Overnight",
    value: "OvernightShipping",
}
]

const dropdown: Stripe.Checkout.SessionCreateParams.CustomField.Dropdown = {
    options: DropDownOption,
}
export const paymentRouter = createTRPCRouter({

    createCheckout: protectedProcedure.input(z.object({ products: CartItemZod.array(), email: z.string() })).mutation(({ input }) => {
        //This is the stripe checkout session create procedure you can made a custom checkout session here with custom fields that stripe provides
        return stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card", "paypal"],
            shipping_address_collection: {
                allowed_countries: ["SI"],
            },
            custom_fields: [
                {
                    label: label,
                    dropdown: dropdown,
                    type: "dropdown",
                    key: "shipping",
                },
            ],
            customer_email: input.email,
            line_items: [
                ...CartItemZod.array().parse(input.products).map((product) => ({
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