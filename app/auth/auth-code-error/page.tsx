import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function AuthCodeError() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-zinc-950 text-white">
            <div className="flex max-w-[400px] flex-col items-center gap-6 p-8 text-center">
                <div className="rounded-full bg-red-500/10 p-4 ring-1 ring-red-500/20">
                    <AlertTriangle className="h-12 w-12 text-red-500" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Authentication Error</h1>
                    <p className="text-muted-foreground text-gray-400">
                        We couldn't verify your request. The link may have expired or is invalid.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/auth/login"
                        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                    >
                        Back to Login
                    </Link>
                    <Link
                        href="/auth/forgot-password"
                        className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
                    >
                        Try Again
                    </Link>
                </div>
            </div>
        </div>
    )
}
