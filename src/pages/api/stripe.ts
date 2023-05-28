import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "stream/consumers";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const sig = req.headers["stripe-signature"] as string;
        const buf = await buffer(req);
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                buf,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET as string
            );

        } catch (err) {
            console.log(err);
            let message = "Unkonwn error";
            if (err instanceof Error) message = err.message;
            return res.status(400).send(`Webhook error: ${message}`);
        }

        switch (event.type) {
            case "checkout.session.completed":
                //You can hit ur database, other apis, etc. here
                const session = event.data.object as Stripe.Checkout.Session;
                console.log(session.amount_total);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }

}
