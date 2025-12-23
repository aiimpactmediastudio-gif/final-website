"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/auth/login",
    "/signup",
    "/auth/signup",
    "/forgot-password",
    "/reset-password",
    "/auth/reset-password",
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const isPublic = PUBLIC_ROUTES.includes(pathname);
            if (!user && !isPublic) {
                router.replace("/");
            }
        };
        checkAuth();
    }, [pathname, router]);

    return <>{children}</>;
}
