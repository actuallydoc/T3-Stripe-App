import React from 'react'

export default function CheckoutButton({ handleCheckout }: { handleCheckout: () => Promise<void> }) {

    return (
        <div className="bg-emerald-500 content-center text-center text-slate-200 font-bold rounded-full hover:bg-emerald-800  duration-300 transform hover:text-slate-400">
            <button className=' w-full p-2' onClick={() => {
                handleCheckout().catch(() => {
                    console.log("Error");
                })
            }}>
                Na blagajno
            </button>
        </div>)
}
