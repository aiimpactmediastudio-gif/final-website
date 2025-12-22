"use client"

import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        const supabase = createClient()
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/auth/callback?next=/auth/reset-password`,
        })

        if (error) {
            setError(error.message)
            setIsLoading(false)
        } else {
            setSuccess(true)
            setIsLoading(false)
        }
    }

    return (
        <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href="/" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                        <ArrowLeft className="h-5 w-5" /> Back to Home
                    </Link>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Security is paramount. Recover your access and get back to casting.&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email address to receive a password recovery link.
                        </p>
                    </div>

                    {success ? (
                        <div className="space-y-4 text-center animate-in fade-in">
                            <div className="flex justify-center">
                                <CheckCircle className="h-12 w-12 text-green-500" />
                            </div>
                            <h3 className="font-semibold text-lg">Check your email</h3>
                            <p className="text-sm text-muted-foreground">
                                We have sent a password reset link to <span className="font-medium text-foreground">{email}</span>.
                            </p>
                            <Button asChild className="w-full" variant="outline">
                                <Link href="/auth/login">Back to Login</Link>
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleReset}>
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <Label className="sr-only" htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {error && (
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                )}
                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <svg
                                            className="mr-2 h-4 w-4 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                        </svg>
                                    )}
                                    Send Recovery Link
                                </Button>
                            </div>
                        </form>
                    )}

                    {!success && (
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            <Link href="/auth/login" className="hover:text-brand underline underline-offset-4">
                                Remember your password? Login
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
