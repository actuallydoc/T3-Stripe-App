// import React from 'react'
// import { useSelector } from 'react-redux'
// import type { RootState } from '../../stores/shoppingCartStore'
// import Image from 'next/image';
// import CheckoutButton from 'components/Stripe/CheckoutButton';
// import { useSession } from 'next-auth/react';
// import toast from 'react-hot-toast';
// import { api } from '@/utils/api';
// import { useStripe } from '@stripe/react-stripe-js';

// //Not a fan of this i might just have the modal
// export default function Cart() {
//     const cart = useSelector((state: RootState) => state.items);
//     const { data: sessionData } = useSession();
//     const checkout = api.payment.createCheckout.useMutation();
//     const stripePromise = useStripe();
//     const cartSelector = useSelector((state: RootState) => state.items);
//     const handleCheckout = async () => {
//         // Quantity state is passed to the backend
//         // Product id is passed to the backend
//         if (Object.keys(cart).length === 0) {
//             toast.error("Shopping Cart is empty");
//             return;
//         }
//         toast.success("Redirecting to checkout page");
//         const response = await checkout.mutateAsync({
//             //Because the product type does not have a quantity property it is added here and the error appears
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             //@ts-ignore
//             products: cartSelector,
//             email: sessionData?.user?.email as string,
//         });
//         const stripe = stripePromise;
//         //Redirects the user to the checkout page if the checkout session provider exist's and is not null
//         //This is stripe magic
//         if (stripe !== null) {
//             await stripe.redirectToCheckout({
//                 sessionId: response.id,
//             })
//         }
//     }
//     return (
//         <div className='flex-col justify-center content-center text-center'>
//             <div className='flex-col space-x-10 justify-center pt-10'>
//                 <div>
//                     <table className='w-1/2 content-center justify-center text-center'>
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Quantity</th>
//                                 <th>Price</th>
//                                 <th>Total</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cartSelector.map((item) => (
//                                 <tr key={item.id} className='border-2 rounded-lg'>
//                                     <td className='flex space-x-5 justify-center text-center'>
//                                         <Image src={item.images[0] as string} alt="product" width={100} height={50} />
//                                         <div>{item.name}</div>
//                                     </td>
//                                     <td>{item.quantity}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>{item.quantity * item.quantity}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                         <tfoot>
//                             <tr>
//                                 <td></td>
//                                 <td></td>
//                                 <td><strong>Total:</strong></td>
//                                 {/* <td>{calculateTotal()}</td> */}
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//                 <div className='w-1/2'>
//                     <CheckoutButton handleCheckout={handleCheckout} />
//                 </div>


//             </div>

//         </div>
//     )
// }
