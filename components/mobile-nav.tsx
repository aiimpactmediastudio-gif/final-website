"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Film, Users, Heart } from "lucide-react"

import { cn } from "@/lib/utils"

export function MobileNav() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 md:hidden">
            <div className="grid h-16 grid-cols-4 items-center justify-items-center">
                <Link
                    href="/"
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-red-500",
                        pathname === "/" ? "text-red-500" : "text-muted-foreground"
                    )}
                >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                </Link>
                <Link
                    href="/casting"
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-red-500",
                        pathname === "/casting" ? "text-red-500" : "text-muted-foreground"
                    )}
                >
                    <Film className="h-5 w-5" />
                    <span>Casting</span>
                </Link>
                <Link
                    href="/sponsors"
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-red-500",
                        pathname === "/sponsors" ? "text-red-500" : "text-muted-foreground"
                    )}
                >
                    <Users className="h-5 w-5" />
                    <span>Sponsors</span>
                </Link>
                <Link
                    href="/donate"
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-red-500",
                        pathname === "/donate" ? "text-red-500" : "text-muted-foreground"
                    )}
                >
                    <Heart className="h-5 w-5" />
                    <span>Donate</span>
                </Link>
            </div>
        </div>
    )
}
