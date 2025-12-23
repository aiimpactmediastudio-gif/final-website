"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export const dynamic = 'force-dynamic';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code") || searchParams.get("token");
    const email = searchParams.get("email");
    const supabase = createClient();

    const [sessionChecked, setSessionChecked] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Exchange the recovery code for a session
    useEffect(() => {
        if (code) {
            supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
                if (error) {
                    console.error("Code exchange error:", error);
                    router.replace("/auth/auth-code-error");
                } else {
                    setSessionChecked(true);
                }
            });
        } else {
            // No code – treat as invalid
            setSessionChecked(true);
        }
    }, [code, supabase, router]);

    // Verify that a session exists after exchange
    useEffect(() => {
        if (sessionChecked) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (!session) {
                    setErrorMsg(
                        "Your reset link is invalid or has expired. Please request a new password reset."
                    );
                }
            });
        }
    }, [sessionChecked, supabase]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }
        setIsLoading(true);
        setFormError(null);
        const { error, data } = await supabase.auth.updateUser({ password });
        if (error) {
            setFormError(error.message);
        } else {
            // Revoke all other sessions for this user
            const user = data?.user ?? null;
            if (user?.id) {
                try {
                    await fetch('/api/revoke-sessions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: user.id }),
                    });
                } catch (e) {
                    console.error('Failed to revoke sessions', e);
                }
            }
            // Show success toast
            import('react-hot-toast').then(({ toast }) => {
                toast.success('Password updated – you can now log in');
            });
            router.push('/auth/login?checkEmail=true');
        }
        setIsLoading(false);
    };

    if (errorMsg) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <p className="text-red-500 mb-4">{errorMsg}</p>
                <Link href="/auth/forgot-password" className="text-blue-500 underline">
                    Forgot Password?
                </Link>
            </div>
        );
    }

    if (!sessionChecked) {
        return <p className="text-center py-8">Loading...</p>;
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
                        Please enter your new password below.
                    </p>
                </div>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="grid gap-1">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
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
                            disabled={isLoading}
                            required
                        />
                    </div>
                    {formError && (
                        <p className="text-red-500 text-sm">{formError}</p>
                    )}
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<p className="text-center py-8">Loading...</p>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
