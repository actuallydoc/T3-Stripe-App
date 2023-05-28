import React from 'react'

export default function CheckoutButton({ handleCheckout }: { handleCheckout: () => Promise<void> }) {
    return (
        <div>
            <div className="bg-white/10 text-white font-bold  px-10 py-3 rounded-full hover:bg-white/20 duration-300 transform">
                <button onClick={() => {
                    handleCheckout().catch(() => {
                        console.log("Error");
                    })
                }}>
                    Pay with Stripe
                </button>
            </div>
        </div>)
}
