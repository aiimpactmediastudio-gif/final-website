"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold sm:inline-block text-red-600 text-xl tracking-tighter shadow-red-500/20 drop-shadow-sm">
                    AI IMPACT MEDIA
                </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                    href="/casting"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/casting" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Casting
                </Link>
                <Link
                    href="/sponsors"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/sponsors" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Sponsors
                </Link>
                <Link
                    href="/donate"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/donate" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Donate
                </Link>
                <Link
                    href="/about"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/about" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    About
                </Link>
            </nav>
        </div>
    )
}
