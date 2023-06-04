import { WebhookClient, EmbedBuilder, MessagePayload, GuildTextBasedChannel } from "discord.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});
const wbClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL as string,
})
const emb = new EmbedBuilder()
//Buffer function that handles the request body the Stripe api needs (webhook signing)
const buffer = (req: NextApiRequest) => {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];

        req.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            resolve(Buffer.concat(chunks));
        });

        req.on('error', reject);
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const sig = req.headers["stripe-signature"] as string;
        let event;
        const body = await buffer(req);
        try {
            event = stripe.webhooks.constructEvent(
                body,
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
                console.log("Checkout session completed");
                break;
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log(paymentIntent)

                break;
            case "charge.succeeded":
                const charge = event.data.object as Stripe.Charge;
                console.log("Charge was successful!");
                emb.addFields({
                    name: "New order",
                    value: `New order from ${charge.billing_details.name as string} for ${charge.amount / 100}€`,
                })
                emb.addFields({
                    name: "Address",
                    value: `${charge.billing_details.address?.line1 as string}, ${charge.billing_details.address?.city ? charge.billing_details.address.city : "No Billing City"}, ${charge.billing_details.address?.country ? charge.billing_details.address.country : "No Billing Country"}`,
                })
                emb.addFields({
                    name: "Items",
                    value: `${charge.description as string}`,
                })
                await wbClient.send({
                    embeds: [emb]
                });

                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

    }


}
export const config = {
    api: {
        bodyParser: false,
    },
};


