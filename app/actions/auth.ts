"use server"

import { createClient } from "@supabase/supabase-js"
import { sendPasswordResetEmail } from "./email"

export async function requestPasswordReset(email: string) {
    // 1. Validate Service Role Key presence
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("Missing SUPABASE_SERVICE_ROLE_KEY")
        return { success: false, error: "Internal Configuration Error" }
    }

    try {
        // 2. Create Admin Client
        // Note: We use supabase-js directly for admin operations as @supabase/ssr might be tailored for client context
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        )

        // 3. Generate Recovery Link
        // Support Vercel deployments automatically by checking NEXT_PUBLIC_VERCEL_URL or VERCEL_URL
        // The process.env.VERCEL_URL is automatically set by Vercel but doesn't include https://
        let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        if (process.env.VERCEL_URL) {
            siteUrl = `https://${process.env.VERCEL_URL}`;
        }

        console.log(`Generating reset link for site: ${siteUrl}`); // Debug log

        const { data, error } = await supabaseAdmin.auth.admin.generateLink({
            type: "recovery",
            email,
            options: {
                // Use dedicated reset callback to prevent redirect issues
                redirectTo: `${siteUrl}/auth/callback/reset`,
            }
        })

        if (error) {
            console.error("Supabase Admin Error:", error)
            // SECURITY: Do not reveal if user does not exist.
            // If the error indicates "User not found" (or similar), we must still return success.
            // Supabase admin might return specific errors, so we catch them here.
            // We'll treat all errors as "success" for the frontend to prevent enumeration,
            // unless it's a configuration error which we already handled above.
            return { success: true }
        }

        if (!data.properties?.action_link) {
            console.error("No action_link returned")
            return { success: false, error: "Could not generate reset link" }
        }

        // 4. Send Email via Resend
        const emailResult = await sendPasswordResetEmail(email, data.properties.action_link)

        if (!emailResult.success) {
            return { success: false, error: emailResult.error }
        }

        return { success: true }

    } catch (err) {
        console.error("Unexpected error in requestPasswordReset:", err)
        return { success: false, error: "An unexpected error occurred" }
    }
}
