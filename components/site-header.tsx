import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { supabaseServer } from "@/lib/supabase/client" // Server Component

export async function SiteHeader() {
    const supabase = supabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center px-4">
                <MainNav />
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <ModeToggle />
                    <UserNav user={user} />
                </div>
            </div>
        </header>
    )
}
