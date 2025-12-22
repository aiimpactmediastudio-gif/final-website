"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch by only rendering after mounting
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-9 px-0">
                <Sun className="h-[1.2rem] w-[1.2rem] animate-pulse" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    const isDark = theme === "dark"

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative w-9 px-0 hover:bg-white/10 transition-colors duration-200"
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                >
                    {isDark ? (
                        <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />
                    ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
                    )}
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
