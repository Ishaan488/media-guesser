"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Play, Film, Shuffle, Tv2, Star } from "lucide-react";

const genres = [
    {
        name: "Action",
        desc: "Explosions, chases, and heroes.",
        icon: Film,
        color: "from-orange-500 to-red-600",
        bg: "bg-orange-500/10"
    },
    {
        name: "Comedy",
        desc: "Laugh out loud moments.",
        icon: Tv2,
        color: "from-yellow-400 to-orange-500",
        bg: "bg-yellow-500/10"
    },
    {
        name: "Sci-Fi",
        desc: "Space, future, and tech.",
        icon: Star,
        color: "from-cyan-400 to-blue-600",
        bg: "bg-cyan-500/10"
    },
    {
        name: "Random",
        desc: "Test your luck across all genres.",
        icon: Shuffle,
        color: "from-violet-500 to-purple-600",
        bg: "bg-violet-500/10"
    },
];

export default function Home() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 overflow-hidden relative selection:bg-indigo-500/30">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/20 blur-[120px]" />
            </div>

            <div className="z-10 max-w-5xl w-full text-center space-y-8 animate-fade-in">

                {/* Header */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 uppercase tracking-widest font-medium mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Beta v1.0
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl">
                        CINE<span className="text-indigo-500">GUESSER</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        The ultimate test for movie buffs. Identify films from a single frame before the clock runs out.
                    </p>
                </div>

                {/* Genre Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-12">
                    {genres.map((genre, idx) => (
                        <Link
                            key={genre.name}
                            href={`/game?genre=${genre.name}`}
                            className="group relative"
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div
                                className={cn(
                                    "relative h-full p-6 text-left rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 overflow-hidden",
                                    "hover:border-white/20 hover:bg-slate-800/60 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10",
                                    "flex flex-col justify-between min-h-[220px]"
                                )}
                            >
                                {/* Hover Gradient Overlay */}
                                <div
                                    className={cn(
                                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                                        genre.color
                                    )}
                                />

                                {/* Icon */}
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 border border-white/5 shadow-inner",
                                    genre.bg
                                )}>
                                    <genre.icon className="w-6 h-6 text-white/80" />
                                </div>

                                {/* Text */}
                                <div className="space-y-2 z-10">
                                    <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-100 group-hover:text-white transition-colors">
                                        {genre.name}
                                    </h2>
                                    <p className="text-sm text-slate-400 group-hover:text-slate-300 line-clamp-2 leading-relaxed">
                                        {genre.desc}
                                    </p>
                                </div>

                                {/* Play Button Indicator */}
                                <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
                                    <div className="bg-white text-slate-950 p-2 rounded-full shadow-lg">
                                        <Play className="w-4 h-4 fill-current" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer/Stats */}
                <div className="pt-20 flex justify-center gap-12 text-slate-500 text-sm font-medium">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-white text-lg font-bold">500+</span>
                        <span>Movies</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-white text-lg font-bold">10k+</span>
                        <span>Frames</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-white text-lg font-bold">∞</span>
                        <span>Fun</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
