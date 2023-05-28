export interface CartItem {
    quantity: number,
    id: string,
    name: string,
    description: string | null,
    default_price?: string | null | Stripe.price,
}