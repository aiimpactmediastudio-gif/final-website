"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function TokenCatcher() {
    const router = useRouter()

    useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return

        // Standard DOM URL parsing to satisfy static generation safety
        const urlParams = new URLSearchParams(window.location.search)
        // Check for both 'token' (legacy) and 'code' (Supabase PKCE)
        const token = urlParams.get("token") || urlParams.get("code")

        if (token) {
            console.log("Found auth token on landing page, executing emergency redirect...")
            // Preserve all query parameters (token, error, etc.)
            const queryString = window.location.search
            router.replace(`/reset-password${queryString}`)
        }
    }, [router])

    return null
}
