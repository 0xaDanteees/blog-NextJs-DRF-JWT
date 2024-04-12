"use client"

import React from 'react';
import Link from "next/link";
import { User } from "@/lib/nextauth";
import { signOut } from "next-auth/react";
import { 
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
    DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/mode-toggle";
import { cn } from '@/lib/utils';
import { useScrollTop } from '../hooks/UseScroll';
import Image from 'next/image';



interface ClientProps {
    user: User | null;
}

const Navbar: React.FC<ClientProps> = ({ user }) => {
    const scrolled = useScrollTop();
    return (
        <div className={cn(
            "z-10 bg-background fixed top-0 flex items-center w-full p-4",
            scrolled && "border-b shadow-sm"
        )}>
        
            <div className="container flex max-w-screen items-center justify-between px-2 py2">
                <Link href="/" className="cursor-pointer text-xl flex items-center p-3 font-extrabold">
                    DROPZ
                    
                        <Image
                        src="/dropzLogo.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className='ml-2'
                        />
                   
                </Link>
                
                {user ? (
                    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                        <ModeToggle/>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="relative w-10 h-10 flex-shrink-0">
                                    <Avatar>
                                        <AvatarImage src={user.avatar} alt="user pfp"/>
                                        <AvatarFallback>{user.username.slice(0,1)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className=" p-2 w-[300px]" align="end">
                                <Link href={`/profiles/${user.username}`}>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <div className="break-words font-bold">
                                            <div className="mb-2">{user.username || ""}</div>
                                            <div className="text-gray-500 font-light">{user.email || ""}</div>
                                        </div>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator/>
                                <Link href="/blog/create">
                                    <DropdownMenuItem className="cursor-pointer">
                                        Create
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/settings/profile">
                                    <DropdownMenuItem className="cursor-pointer">
                                        Settings
                                    </DropdownMenuItem>
                                </Link>

                                <DropdownMenuItem
                                    onSelect={async () => {
                                        await signOut({ callbackUrl:"/"})
                                    }}
                                    className="text-red-700 cursor-pointer"
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                        <ModeToggle/>
                        <Button asChild variant="outline" className="font-bold">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild variant="default" className="font-bold">
                            <Link href="/signup">Sign in</Link>
                        </Button>
                    </div>
                )}
                
            </div>
       
        </div>
    );
};

export default Navbar;
