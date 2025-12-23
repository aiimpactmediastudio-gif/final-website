"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Play } from "lucide-react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    item: {
        id: string
        title: string
        image: string
        match?: number
        duration?: string
        genre?: string[]
    }
    aspectRatio?: "portrait" | "video"
}

export function GlassCard({ item, aspectRatio = "portrait", className, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-lg bg-white/5 p-1 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]",
                aspectRatio === "portrait" ? "aspect-[2/3]" : "aspect-video",
                className
            )}
            {...props}
        >
            <div className="relative h-full w-full overflow-hidden rounded-md border border-white/10 bg-black/50">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                        <span className="text-4xl text-white/10 font-black tracking-tighter uppercase">{item.title.substring(0, 2)}</span>
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="line-clamp-1 font-bold text-white text-lg tracking-tight group-hover:text-red-500 transition-colors">
                        {item.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-xs font-medium text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-1">
                            {item.match && <span className="text-green-500">{item.match}% Match</span>}
                        </span>
                        <span>{item.duration}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 delay-75">
                        {item.genre?.slice(0, 2).map((g) => (
                            <span key={g} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                                {g}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-600/90 text-white shadow-lg backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                </div>
            </div>
        </div>
    )
}
