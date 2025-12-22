"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Play, Check } from "lucide-react"

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

export function ContentRow({ title, items }: ContentRowProps) {
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
                        <div
                            key={item.id}
                            className="relative flex-none w-[200px] md:w-[280px] aspect-video bg-zinc-800 rounded-sm overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-50 origin-center group/item"
                        >
                            {/* Mock Image Placeholder */}
                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600 font-bold text-4xl select-none">
                                {item.title.charAt(0)}
                            </div>

                            {/* Hover Card (Simple Version) */}
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end h-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <button className="h-8 w-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                                        <Play className="w-4 h-4 text-black fill-current" />
                                    </button>
                                    <button className="h-8 w-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                                        <Check className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                                <h3 className="text-white font-bold text-sm md:text-base leading-tight">{item.title}</h3>
                                <div className="flex items-center gap-2 mt-1 text-[10px] md:text-xs text-gray-300 font-medium">
                                    {item.match && <span className="text-green-500 font-bold">{item.match}% Match</span>}
                                    {item.duration && <span>{item.duration}</span>}
                                    {item.genre && <span className="border border-gray-500 px-1 rounded-sm">{item.genre[0]}</span>}
                                </div>
                            </div>
                        </div>
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
