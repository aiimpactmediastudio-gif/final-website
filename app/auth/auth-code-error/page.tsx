import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthCodeError() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white p-4">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px] p-8 border border-white/10 rounded-xl bg-zinc-900/50 backdrop-blur-xl shadow-2xl text-center">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-red-500" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-black tracking-tighter text-white">Authentication Error</h1>
                    <p className="text-sm text-gray-400">
                        We couldn&apos;t verify your session. This link may have expired or is no longer valid.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold h-11">
                        <Link href="/auth/login">Back to Login</Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
