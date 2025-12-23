"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Play, Check } from "lucide-react"
import { GlassCard } from "@/components/GlassCard"

interface ContentItem {
    id: string
    title: string
    image: string
    match?: number
    duration?: string
    genre?: string[]
}

interface ContentRowProps {
    title: string
    items: ContentItem[]
}

export function ContentRow({ title, items = [] }: ContentRowProps) {
    const rowRef = React.useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
    }

    return (
        <div className="space-y-2 py-4 group/row">
            <h2 className="text-xl md:text-2xl font-bold text-gray-100 px-4 md:px-12 transition-colors duration-200 hover:text-white cursor-pointer">
                {title}
            </h2>

            <div className="relative group/slider">
                {/* Left Arrow */}
                <div
                    className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() => scroll("left")}
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </div>

                {/* Scroll Container */}
                <div
                    ref={rowRef}
                    className="flex gap-2 overflow-x-hidden scroll-smooth px-4 md:px-12 pb-8"
                >
                    {items.map((item) => (
                        <GlassCard key={item.id} item={item} className="w-[200px] md:w-[280px] flex-none cursor-pointer" />
                    ))}
                </div>

                {/* Right Arrow */}
                <div
                    className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() => scroll("right")}
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    )
}
