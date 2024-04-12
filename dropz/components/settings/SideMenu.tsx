"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";



const properties = [
    {
        title: "Profile",
        href: "/settings/profile",
    },
    {
        title: "Password",
        href: "/settings/password"
    },
]

const SideMenu = ()=>{
    const pathname= usePathname();

    return (

        <nav className={cn("flex py-2 space-x-2 md:flex-col md:space-x-0 md:space-y-1")}>
            {properties.map((property) => (
            <Link
            key={property.href}
            href={property.href}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === property.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
                "justify-start"
            )}
            >
            {property.title}
        </Link>
      ))}
            
        </nav>
    )
}

export default SideMenu;