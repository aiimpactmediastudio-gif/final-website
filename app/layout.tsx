import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ToastProvider } from "@/app/providers/toast-provider";
import { LoadingProvider } from "@/app/providers/loading-provider";
import { MobileNav } from "@/components/mobile-nav";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AI IMPACT MEDIA",
  description: "The Netflix of AI Casting & Media",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased flex flex-col", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LoadingProvider>
            <ToastProvider>
              <SiteHeader />
              <MobileNav />
              <AuthGuard>{children}</AuthGuard>
              <SiteFooter />
            </ToastProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

