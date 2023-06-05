import { Button } from "@/../components/ui/button"
import { Label } from "@/../components/ui/label"
import { Input } from "@/../components/ui/input"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/../components/ui/sheet"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/../components/ui/card"

import CartElement from "../Elements/CartElement"
import { useEffect, useRef, useState } from "react"
import { CartItem } from "types"
import { useStripe } from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux"
import { RootState, shoppingCartSlice } from "stores/shoppingCartStore"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import { api } from "@/utils/api"
import Image from "next/image"

export function CartSheet() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [promoCode, setPromoCode] = useState<string>('')
    const stripePromise = useStripe();
    const { data: sessionData } = useSession();
    const cartSelector = useSelector((state: RootState) => state.items);
    const dispatch = useDispatch();
    const checkout = api.payment.createCheckout.useMutation();
    const handleRemoveItem = (e: MouseEvent, item
        : CartItem) => {
        e.preventDefault();
        const data = localStorage.getItem('storeCart')
        if (data) {
            const cart = JSON.parse(data) as CartItem[]
            console.log(cart)
            const newCart = cart.filter((cartItem) => cartItem.default_price !== item.default_price)
            localStorage.setItem('storeCart', JSON.stringify(newCart))
            setCart(newCart)
            toast.success("Item removed from cart");
            dispatch(shoppingCartSlice.actions.removeFromCart(item))
        } else {
            toast.error("Item not removed from cart");
        }

    }
    const handleQuantityChange = (e: React.MouseEvent<HTMLInputElement>, item: CartItem) => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            const cart = JSON.parse(data) as CartItem[]
            const newCart = cart.map((cartItem) => {
                if (cartItem.default_price === item.default_price) {
                    cartItem.quantity = Number(e.target.value)
                }
                return cartItem
            })
            localStorage.setItem('storeCart', JSON.stringify(newCart))
            dispatch(shoppingCartSlice.actions.updateCart(newCart))
        }
    }
    const handleCheckout = async () => {
        // Quantity state is passed to the backend
        // Product id is passed to the backend
        if (Object.keys(cart).length === 0) {
            toast.error("Shopping Cart is empty");
            return;
        }
        toast.success("Redirecting to checkout page");
        const response = await checkout.mutateAsync({
            //Because the product type does not have a quantity property it is added here and the error appears
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            products: cartSelector,
            email: sessionData?.user?.email as string,
        });
        const stripe = stripePromise;
        //Redirects the user to the checkout page if the checkout session provider exist's and is not null
        //This is stripe magic
        if (stripe !== null) {
            await stripe.redirectToCheckout({
                sessionId: response.id,
            })
        }
    }
    const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromoCode(e.target.value)
    }
    const applyPromo = () => {
        toast.success("Promo code applied");

    }
    useEffect(() => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            setCart(JSON.parse(data) as CartItem[])
        }
    }, [cartSelector]);

    return (
        <Sheet>
            <SheetTrigger>
                <CartElement />
            </SheetTrigger>
            <SheetContent position="right" size="sm">
                <SheetHeader>
                    <SheetTitle>Nakupovalni voziček</SheetTitle>
                    <SheetDescription>
                        Tukaj lahko pregledate vaše produkte ,ki so pripravljeni za nakup.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid py-4">
                    {cartSelector.map((item, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <div className="flex space-x-4 justify-between content-center">
                                    <div>
                                        <Image src={item.image} width={100} height={100} alt="product-image" />
                                    </div>
                                    <div className="flex-col">
                                        <Label>Količina</Label>
                                        <Input min={1} onChange={(e) => handleQuantityChange(e, item)} className="w-16" type="number" value={item.quantity} />
                                    </div>
                                    <div className="content-center text-center justify-center">
                                        <Label>Cena</Label>
                                        <p>{item.price * item.quantity}$</p>
                                    </div>
                                    <div className="self-end">
                                        <Button variant={"destructive"} onClick={(e) => handleRemoveItem(e, item)}>Remove</Button>

                                    </div>
                                </div>
                            </CardHeader>

                        </Card>
                    ))}
                    <Label>Skupna cena</Label>
                    <p>{cartSelector.reduce((a, b) => a + (b.price * b.quantity), 0)}$</p>
                </div>
                <SheetFooter>
                    <Input type="text" name="id" value={promoCode} onChange={handlePromoChange} />
                    <Button type="submit" onClick={applyPromo}>Apply</Button>
                    <Button type="button" onClick={() => {
                        handleCheckout().catch(() => {
                            toast.error("Error while redirecting to checkout page");
                        }
                        )
                    }}>
                        Checkout
                    </Button>
                    {/* <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose> */}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}