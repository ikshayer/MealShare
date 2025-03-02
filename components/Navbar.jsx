'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import {User} from "lucide-react"

import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

import { useRouter } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

function Navbar(){

    const {data : session} = useSession()
    const [providers, setProviders] = useState(null);
    
    const router = useRouter()

    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res)
    
        })();
      }, []);

    return(
        <>
        <nav className="flex w-full pt-3 mb-16 justify-between items-center py-[12px]">
            
            <div className="flex items-center">

            <Link href={'/'} className="flex gap-2 flex-center mr-10">
            <Image 
            src='/icons/king-card2.svg'
            width='40'
            height='40'
            alt=''
            className="rounded-full"
            />
            <p className=" font-inter font-semibold text-2xl text-black tracking-wide">NourishEd</p>
            </Link>

            <div className='flex gap-3 max-md:hidden'>

            </div>
            </div>
            <div className="md:flex hidden">
            {
                session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link 
                        href='/create-request'
                        className="black_btn"
                        >
                            Post
                        </Link>
                        <button type="button" onClick={() =>{
                            signOut()
                            router.push('/')
                        }} 
                            className="outline_btn">
                            Sign Out
                        </button>
                        <Link href='/profile'>
                        <div className="w-[37px] h-[37px] bg-black rounded-full flex-center border-zinc-100">
                        <User
                        className="rounded-full w-[27px] h-[27px] text-zinc-100"
                        />
                        </div>
                        </Link>

                    </div>
                ): (
                    <>
                    {
                        providers && Object.values(providers).map(provider =>(
                            <button
                             type="button"
                             key={provider.name}
                             onClick={() => signIn(provider.id)}
                             className="black_btn"
                            >
                                Sign In
                            </button>
                        ))
                    }
                    </>
                    )
                
            }
            </div>
            <div className="md:hidden">
            {session?.user ? (
            <DropdownMenu>
                <DropdownMenuTrigger
                className="outline-none"
                >
                <User
                className="rounded-full w-[37px] h-[37px] bg-zinc-500 text-white"
                
                />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                className='border-zinc-400 md:hidden font-inter'
                >
                    <DropdownMenuLabel>
                        My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator
                    className='bg-zinc-400'
                    />
                    <DropdownMenuItem
                    onClick={() => router.push('/profile')}
                    className=''
                    >
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={() => {
                        signOut()
                        router.push('/')
                    }}
                    >
                        Sign Out
                    </DropdownMenuItem>
                    <DropdownMenuSeparator
                    className='bg-zinc-400 h-[0.5px]'
                    />
                    <DropdownMenuLabel>
                        Paths
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator
                    className='bg-zinc-400'
                    />
                    <DropdownMenuItem
                    onClick={() => router.push('/create-session')}
                    >
                        Post
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={() => router.push('/notes')}
                    >
                        Notes
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={() => router.push('/leaderboard')}
                    >
                        Leaderboard
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
            ) : (
                <div>
                {
                    providers && Object.values(providers).map(provider =>(
                        <button
                         type="button"
                         key={provider.name}
                         onClick={() => signIn(provider.id)}
                         className="black_btn"
                        >
                            Sign In
                        </button>
                    ))
                }
                </div>
            )}
            </div>
        </nav>
        </>
    )
}

export default Navbar

