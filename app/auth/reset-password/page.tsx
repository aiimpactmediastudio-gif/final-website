"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"

export default function ResetPasswordPage() {
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
                            &ldquo;New secure password, fresh start. Let&apos;s get you authenticated.&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Set new password</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your new password below.
                        </p>
                    </div>

                    <Suspense fallback={<div>Loading form...</div>}>
                        <ResetPasswordForm />
                    </Suspense>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        <Link href="/auth/login" className="hover:text-brand underline underline-offset-4">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
