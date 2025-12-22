import Link from "next/link"
import { Users, FileText, Settings, BarChart, ShieldAlert } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-muted/40 border-r hidden md:block">
                <div className="h-full flex flex-col">
                    <div className="h-14 flex items-center px-6 border-b font-semibold text-lg">
                        Admin Panel
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            <BarChart className="h-4 w-4" />
                            Overview
                        </Link>
                        <Link
                            href="/admin/users"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            <Users className="h-4 w-4" />
                            User Management
                        </Link>
                        <Link
                            href="/admin/casting"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            <FileText className="h-4 w-4" />
                            Casting Submissions
                        </Link>
                        <Link
                            href="/admin/ai-reports"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            <ShieldAlert className="h-4 w-4" />
                            AI Reports & Audits
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
