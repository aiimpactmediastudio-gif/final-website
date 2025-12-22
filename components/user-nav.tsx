"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { User, CreditCard, Settings, LogOut, Film, Sparkles, LayoutDashboard } from "lucide-react"

interface UserNavProps {
    user: SupabaseUser | null;
}

export function UserNav({ user }: UserNavProps) {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    // Dynamic Greeting Logic
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    if (!user) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                        Log in
                    </Button>
                </Link>
                <Link href="/auth/signup">
                    <Button size="sm" className="bg-white text-black hover:bg-gray-200 font-medium">Sign up</Button>
                </Link>
            </div>
        )
    }

    const isAdmin = user.user_metadata?.role === 'admin' || user.email?.includes('admin'); // Simple check for now
    const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || "Creator";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 hover:border-red-500/50 transition-colors">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatars/01.png" alt="@user" />
                        <AvatarFallback className="bg-zinc-800 text-white font-bold">{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-black" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-black/95 border-white/10 backdrop-blur-xl text-white p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-xs text-red-500 font-bold uppercase tracking-widest">{getGreeting()}</p>
                        <p className="text-lg font-bold leading-none truncate">{displayName}</p>
                        <p className="text-xs leading-none text-gray-400 truncate">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>

                {/* Mock Credit Display */}
                <div className="mx-3 mb-2 p-2 rounded bg-white/5 border border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-medium text-gray-300">Credits</span>
                    </div>
                    <span className="text-sm font-bold text-white">2,400</span>
                </div>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuGroup>
                    <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-white">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <DropdownMenuShortcut className="text-gray-500">⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/billing">
                        <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-white">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                            <DropdownMenuShortcut className="text-gray-500">⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/settings">
                        <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-white">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <DropdownMenuShortcut className="text-gray-500">⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuGroup>
                    <Link href="/profile?tab=activity">
                        <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-white">
                            <Film className="mr-2 h-4 w-4" />
                            <span>My Auditions</span>
                        </DropdownMenuItem>
                    </Link>
                    {isAdmin && (
                        <Link href="/admin">
                            <DropdownMenuItem className="cursor-pointer focus:bg-white/10 focus:text-white text-red-400 hover:text-red-400">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Admin Dashboard</span>
                            </DropdownMenuItem>
                        </Link>
                    )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer focus:bg-red-900/20 focus:text-red-500 text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
