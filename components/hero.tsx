"use client"

import { Button } from "@/components/ui/button"
import { Play, Info } from "lucide-react"

export function Hero() {
    return (
        <div className="relative h-[85vh] w-full max-h-[800px]">
            {/* Background Image / Video Placeholder */}
            <div className="absolute inset-0 z-0 select-none">
                {/* Mock Cinematic Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />

                {/* Gradient Overlays for Netflix Look */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            </div>

            <div className="relative z-20 flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
                <div className="max-w-2xl space-y-6 pt-20">
                    <h1 className="text-6xl font-black tracking-tighter text-white sm:text-7xl md:text-8xl drop-shadow-2xl">
                        AI IMPACT <br />
                        <span className="text-red-600">MEDIA</span>
                    </h1>
                    <p className="text-lg text-gray-200 sm:text-xl font-medium drop-shadow-md max-w-xl">
                        The world&apos;s first AI-driven casting and media platform. Revolutionizing the industry with brutal efficiency and cinematic excellence.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200 font-bold transition-all">
                            <Play className="mr-2 h-5 w-5 fill-current" />
                            Start Casting
                        </Button>
                        <Button size="lg" variant="secondary" className="h-12 px-8 text-base bg-gray-500/40 text-white hover:bg-gray-500/60 backdrop-blur-sm font-bold transition-all">
                            <Info className="mr-2 h-5 w-5" />
                            More Info
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
