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
        // This generates a link like: {site_url}/auth/callback?code=...&type=recovery
        // We instruct Supabase to redirect the user to our reset-password page after handling the code
        const { data, error } = await supabaseAdmin.auth.admin.generateLink({
            type: "recovery",
            email,
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/auth/reset-password`,
            }
        })

        if (error) {
            console.error("Supabase Admin Error:", error)
            return { success: false, error: error.message }
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
