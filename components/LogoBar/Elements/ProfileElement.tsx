import React, { useState } from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from 'components/ui/button'
import { useRouter } from 'next/router'

export default function ProfileElement({ imageLink }: { imageLink: string }) {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Image className='rounded-full cursor-pointer hover:scale-105 duration-300' src={imageLink} alt="Picture of the author" width={40} height={32} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className='flex-col bg-slate-200 text-black p-2 rounded-lg space-y-5'>
                    <div>
                        <Button variant={"outline"} onClick={() => {
                            router.push('/profile').catch(err => console.log(err))
                        }}>Moj profil </Button>
                    </div>
                    <div>
                        <Button variant={"outline"} onClick={() => {
                            router.push('/orders').catch(err => console.log(err))
                        }}>Naročila</Button>
                    </div>
                    <div>
                        <Button variant={"outline"} onClick={() => {
                            router.push('/settings').catch(err => console.log(err));
                        }}>Nastavitve</Button>
                    </div>
                    <div>
                        <Button variant={"outline"} onClick={() => {
                            void signOut()
                        }
                        }>Odjava</Button>
                    </div>
                </div>

            </DropdownMenuContent>
        </DropdownMenu>


    )
}
