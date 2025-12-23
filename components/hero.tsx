"use client"

import { Button } from "@/components/ui/button"
import { Play, Info } from "lucide-react"

export function Hero() {
    return (
        <div className="relative h-[85vh] w-full overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent opacity-50 animate-pulse" />

                {/* Abstract shapes/glows */}
                <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[100px] animate-[pulse_5s_ease-in-out_infinite]" />
                <div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[120px] animate-[pulse_7s_ease-in-out_infinite_reverse]" />
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-zinc-900 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-20 flex h-full flex-col justify-center px-4 pb-12 pt-0 sm:px-6 lg:px-12 xl:px-16">
                <div className="max-w-2xl space-y-6 pt-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500 backdrop-blur-sm">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        AI Casting Engine v2.0
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
                        Identify <span className="text-red-600">Talent</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">at Hyperspeed</span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-lg text-lg text-gray-300 sm:text-xl leading-relaxed">
                        The world's first AI-powered casting platform. match actors to roles with 99% accuracy using our proprietary neural engine.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <Button size="lg" className="h-14 gap-2 rounded-lg bg-red-600 px-8 text-base font-bold text-white transition-all hover:bg-red-700 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                            <Play className="h-5 w-5 fill-current" />
                            Start Casting
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 gap-2 rounded-lg border-white/20 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40">
                            <Info className="h-5 w-5" />
                            How it Works
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </div>
    )
}
