"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useMemo, Suspense } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff } from "lucide-react"
import { sendWelcomeEmail } from "@/app/actions/email"
import zxcvbn from 'zxcvbn';

export default function SignupPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-black text-white">Loading...</div>}>
            <SignupContent />
        </Suspense>
    )
}

function SignupContent() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [googleLoading, setGoogleLoading] = useState(false)

    // Password Visibility State
    // URL Params for Reset Flow
    const searchParams = useSearchParams()
    const view = searchParams.get("view")
    const code = searchParams.get("code") || searchParams.get("token")
    const isResetMode = view === "reset" && !!code

    // Password Visibility State
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Password Strength Logic
    const strength = useMemo(() => {
        if (!password) return 0;
        const result = zxcvbn(password);
        return Math.min(result.score * 25, 100); // Scale 0-4 to 0-100
    }, [password])

    const strengthColor = useMemo(() => {
        if (strength < 50) return "bg-red-500"
        if (strength < 75) return "bg-yellow-500"
        return "bg-green-500"
    }, [strength])

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setIsLoading(true)
        setError(null)
        const supabase = supabaseBrowser

        if (isResetMode) {
            // HANDLE PASSWORD RESET
            const { error: resetError } = await supabase.auth.updateUser({ password })

            if (resetError) {
                setError(resetError.message)
                setIsLoading(false)
            } else {
                // Send 'Password Changed' confirmation email
                const { data: { user } } = await supabase.auth.getUser()
                if (user?.email) {
                    import('@/app/actions/email').then(mod => mod.sendPasswordChangedEmail(user.email!));
                }

                router.push("/auth/login?passwordReset=true")
            }
        } else {
            // HANDLE REGULAR SIGNUP via Ruthless API
            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    // Start with generic error
                    let errorMsg = data.error || 'Signup failed';
                    // If zxcvbn details are present, append them
                    if (data.details && Array.isArray(data.details) && data.details.length > 0) {
                        errorMsg += ': ' + data.details.join(' ');
                    }
                    throw new Error(errorMsg);
                }

                // Success
                router.push("/auth/login?checkEmail=true")

            } catch (err: any) {
                setError(err.message);
                setIsLoading(false);
            }
        }
    }

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)
        const supabase = supabaseBrowser
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            console.error("Google Login Error:", error)
            setError(error.message)
            setGoogleLoading(false)
        }
    }

    return (
        <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-zinc-900 p-10 text-white dark:border-r lg:flex border-r border-white/10">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-red-900/40" />

                <div className="relative z-20 flex items-center text-lg font-bold tracking-tighter">
                    <span className="text-red-600 mr-2 text-2xl">AI IMPACT</span> MEDIA
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-medium leading-relaxed drop-shadow-lg">
                            &ldquo;This platform changed everything. The AI casting tools are simply on another level.&rdquo;
                        </p>
                        <footer className="text-sm text-gray-300 font-bold tracking-wide">— Sofia Jenkins, Casting Director</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 bg-black/95 h-full flex items-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px] p-8 border border-white/10 rounded-xl bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-black tracking-tighter text-white">
                            {isResetMode ? 'Reset Password' : 'Create Account'}
                        </h1>
                        <p className="text-sm text-gray-400">
                            {isResetMode ? 'Secure your account with a new password.' : 'Join the future of media production.'}
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <form onSubmit={handleSignup}>
                            <div className="grid gap-4">
                                { /* Only show Email field if NOT in reset mode */}
                                {!isResetMode && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading || googleLoading}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-black/50 border-white/10 focus:border-red-500 text-white placeholder:text-gray-600 transition-colors h-11"
                                        />
                                    </div>
                                )}

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-gray-300">
                                        {isResetMode ? 'New Password' : 'Password'}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            placeholder={isResetMode ? "Enter new password" : "Create a password"}
                                            type={showPassword ? "text" : "password"}
                                            autoCapitalize="none"
                                            autoComplete="new-password"
                                            disabled={isLoading || googleLoading}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-black/50 border-white/10 focus:border-red-500 text-white placeholder:text-gray-600 transition-colors h-11 pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-white"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading || googleLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                        </Button>
                                    </div>
                                    {/* Password Strength Indicator */}
                                    {password && (
                                        <div className="space-y-1 mt-1">
                                            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${strengthColor} transition-all duration-500 ease-out`}
                                                    style={{ width: `${strength}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            placeholder="Re-enter password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            autoCapitalize="none"
                                            autoComplete="new-password"
                                            disabled={isLoading || googleLoading}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`bg-black/50 border-white/10 text-white placeholder:text-gray-600 transition-colors h-11 pr-10 ${confirmPassword && password !== confirmPassword ? "border-red-500 focus-visible:ring-red-500" : "focus:border-red-500"}`}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-white"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={isLoading || googleLoading}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                        </Button>
                                    </div>
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="text-xs text-red-500 font-medium">Passwords do not match</p>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-sm text-red-500 font-medium bg-red-500/10 p-2 rounded text-center border border-red-500/20">
                                        {error}
                                    </p>
                                )}

                                <Button disabled={isLoading || googleLoading} className="h-11 font-bold bg-red-600 hover:bg-red-700 text-white transition-all">
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
                                    {isResetMode ? 'Reset Password' : 'Create Account'}
                                </Button>
                            </div>
                        </form>

                        {/* Divider - Only show if standard signup */}
                        {!isResetMode && (
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#121215] px-4 text-gray-500 font-medium tracking-widest border border-white/5 rounded-full py-0.5">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Google Login - Only show if standard signup */}
                        {!isResetMode && (
                            <Button variant="outline" type="button" disabled={isLoading || googleLoading} onClick={handleGoogleLogin} className="h-11 bg-white hover:bg-gray-50 text-black hover:text-black border-none font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                                {googleLoading ? (
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
                                ) : (
                                    <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                )}
                                Continue with Google
                            </Button>
                        )}
                    </div>
                    <p className="px-8 text-center text-sm text-gray-400">
                        {isResetMode ? (
                            <Link href="/auth/login" className="hover:text-red-500 underline underline-offset-4 transition-colors">
                                Return to Login
                            </Link>
                        ) : (
                            <>By clicking continue, you agree to our{" "}
                                <Link href="/terms" className="underline underline-offset-4 hover:text-red-500 transition-colors">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="underline underline-offset-4 hover:text-red-500 transition-colors">
                                    Privacy Policy
                                </Link>
                                .
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
