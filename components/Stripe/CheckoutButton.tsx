import React from 'react'

export default function CheckoutButton({ handleCheckout }: { handleCheckout: () => Promise<void> }) {
    return (
        <div className="bg-sky-400 content-center text-center text-slate-200 font-bold  px-10 py-3 rounded-full hover:bg-sky-200  duration-300 transform hover:text-slate-400">
            <button onClick={() => {
                handleCheckout().catch(() => {
                    console.log("Error");
                })
            }}>
                Pay with Stripe
            </button>
        </div>)
}
