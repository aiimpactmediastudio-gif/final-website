"use client"

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Loader2 } from "lucide-react"

// Force dynamic rendering to handle search params
export const dynamic = 'force-dynamic';

function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    // Check for both legacy 'token' and typical 'code' params
    const token = searchParams.get('token') || searchParams.get('code')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!token) {
            // If no token in URL, check if we have an active session
            // (Scenario: Middleware/Callback already exchanged code for session)
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                setError('Invalid request. No reset token found and no active session.')
                return
            }
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        try {
            const supabase = createClient()

            // If we have a token (PKCE flow usually exchanges code first, but older links might have token)
            // Actually, for Supabase PKCE:
            // 1. User clicks link -> /auth/callback?code=...
            // 2. Callback exchanges code -> sets session -> redirects to /reset-password
            // 3. THIS page loads. Token might NOT be in URL if redirected purely by cookie.
            // So we should try plain updateUser first (relying on session).

            let updateError;

            // First try updating user assuming we have a session (preferred Modern method)
            const { error: sessionError } = await supabase.auth.updateUser({
                password: password
            })

            updateError = sessionError;

            // If that fails and we have a token (Legacy/Direct handling), try exchanging it?
            // Note: exchangeCodeForSession is usually done in callback.
            // But let's handle the specific case where maybe we are passed a raw token hash (unlikely in PKCE)
            // We'll stick to updateUser.

            if (updateError) {
                // If error says "Auth session missing!" and we have a code...
                // The callback should have handled this.
                // But if we are here and failing, show the message.
                setError(updateError.message)
                return
            }

            setSuccess(true)

            // Redirect after 3 seconds
            setTimeout(() => {
                router.push('/auth/login')
            }, 3000)

        } catch (err: any) {
            setError(err.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-green-500/10 border border-green-500/20 p-8 rounded-lg text-center">
                    <h2 className="text-xl font-bold text-green-500 mb-2">Password Updated!</h2>
                    <p>Redirecting to login...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="lg:p-8 w-full max-w-md">
                <div className="flex flex-col space-y-2 text-center mb-6">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Set new password</h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your new password below.
                    </p>
                </div>

                {/* Debug - Helpful for User to see if system recognizes their state */}
                {/* <div className="bg-muted p-2 rounded text-xs mb-4 text-center font-mono">
                Code/Token Present: {token ? 'YES' : 'NO (Relying on Session)'}
            </div> */}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting...
                            </>
                        ) : 'Reset Password'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    )
}
