"use client"

import { useState } from "react"
import { sendWelcomeEmail } from "@/app/actions/email"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestEmailPage() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setMessage("")

        try {
            const result = await sendWelcomeEmail(email, "Test User")
            if (result.success) {
                setStatus("success")
                setMessage(`Email sent successfully to ${email}! Check your inbox.`)
            } else {
                setStatus("error")
                setMessage(`Failed: ${result.error}`)
            }
        } catch (err) {
            setStatus("error")
            setMessage("An unexpected error occurred.")
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <div className="w-full max-w-md space-y-4 border border-white/10 p-8 rounded-xl bg-zinc-900">
                <h1 className="text-2xl font-bold text-center">Test Email Delivery</h1>
                <p className="text-gray-400 text-center text-sm">
                    Use this to verify Resend integration independently of Supabase Signup.
                </p>

                <form onSubmit={handleSend} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Recipient Email</Label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="bg-black/50 border-white/10"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                        {status === "loading" ? "Sending..." : "Send Test Email"}
                    </Button>
                </form>

                {message && (
                    <div className={`p-4 rounded-md text-sm text-center ${status === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}
