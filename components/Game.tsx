"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getRandomMovie, Movie } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { History, ChevronLeft, ChevronRight, Timer, Play, X, ArrowLeft } from "lucide-react";

export default function Game() {
    const searchParams = useSearchParams();
    const genre = searchParams.get("genre") || "Random";
    const router = useRouter();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [frameOffset, setFrameOffset] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [feedback, setFeedback] = useState<"none" | "correct" | "incorrect">("none");
    const [gameOver, setGameOver] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    // Load initial movie
    const loadNewMovie = useCallback(() => {
        const newMovie = getRandomMovie(genre);
        if (!newMovie && !movie) {
            alert("No movies found for this genre!");
            router.push("/");
            return;
        }
        setMovie(newMovie);
        setTimeLeft(60);
        setFrameOffset(0);
        setInputValue("");
        setFeedback("none");
    }, [genre, router, movie]);

    useEffect(() => {
        loadNewMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Timer logic
    useEffect(() => {
        if (!movie || feedback === "correct" || gameOver) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTimeOut();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [movie, feedback, gameOver]);

    const handleTimeOut = () => {
        setFeedback("incorrect");
        setTimeout(() => {
            loadNewMovie();
        }, 2000);
    };

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!movie || feedback !== "none") return;

        const answer = inputValue.trim().toLowerCase();
        const isCorrect =
            answer === movie.title.toLowerCase() ||
            (movie.character && answer === movie.character.toLowerCase());

        if (isCorrect) {
            setScore((s) => s + 1);
            setFeedback("correct");
            setTimeout(() => {
                loadNewMovie();
            }, 1500);
        } else {
            const input = document.getElementById("guess-input");
            input?.classList.add("animate-shake");
            // add red border momentarily?
            setTimeout(() => input?.classList.remove("animate-shake"), 500);
        }
    };

    const handleFrameChange = (delta: number) => {
        setFrameOffset((prev) => {
            const newOffset = prev + delta;
            if (newOffset > 3) return 3;
            if (newOffset < -3) return -3;
            return newOffset;
        });
    };

    if (!movie) return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white">
            <div className="animate-pulse">Loading Scene...</div>
        </div>
    );

    return (
        <div className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">

            {/* Dynamic Background based on score or just ambience */}
            <div className="absolute inset-0 bg-slate-950 -z-20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 -z-10" />

            {/* Header */}
            <header className="flex w-full items-center justify-between p-6 md:p-8 z-20">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-full hover:bg-white/5"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Exit</span>
                </button>

                <div className="flex flex-col items-end">
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Score</span>
                    <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 tabular-nums leading-none">
                        {score.toString().padStart(2, '0')}
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 gap-8 pb-12 z-10">

                {/* Timer Bar */}
                <div className="w-full max-w-3xl h-1.5 bg-slate-800/50 rounded-full overflow-hidden relative backdrop-blur-sm">
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_2px_rgba(99,102,241,0.3)]",
                            timeLeft > 30 ? "bg-indigo-500" : timeLeft > 10 ? "bg-amber-500" : "bg-rose-600 animate-pulse"
                        )}
                        style={{ width: `${(timeLeft / 60) * 100}%` }}
                    />
                </div>

                {/* Display Area */}
                <div className="w-full max-w-5xl relative group perspective-1000">
                    {/* Frame offset indicators */}
                    <div className="absolute -top-12 left-0 right-0 flex justify-center items-center gap-4 text-sm font-medium text-slate-400">
                        <span className={cn("transition-colors", frameOffset < 0 && "text-indigo-400")}>-60s</span>
                        <div className="flex gap-1">
                            {[-3, -2, -1, 0, 1, 2, 3].map((tick) => (
                                <div
                                    key={tick}
                                    className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                        tick === frameOffset ? "bg-white scale-150 shadow-[0_0_8px_white]" : "bg-slate-700"
                                    )}
                                />
                            ))}
                        </div>
                        <span className={cn("transition-colors", frameOffset > 0 && "text-indigo-400")}>+60s</span>
                    </div>

                    {/* Main Image Container */}
                    <div className={cn(
                        "relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/5 bg-black",
                        feedback === "correct" ? "ring-4 ring-green-500/50 scale-[1.02]" :
                            feedback === "incorrect" ? "ring-4 ring-red-500/50 grayscale" : "hover:ring-1 hover:ring-white/20"
                    )}>

                        {/* Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={movie.frames[frameOffset]}
                            alt="Movie Frame"
                            className={cn(
                                "w-full h-full object-cover transition-opacity duration-300",
                                // simple fade simulation
                            )}
                        />

                        {/* Overlay Feedback */}
                        <div className={cn(
                            "absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 z-10",
                            feedback === "none" ? "opacity-0 pointer-events-none" : "opacity-100"
                        )}>
                            {feedback === "correct" && (
                                <>
                                    <div className="bg-green-500/20 p-6 rounded-full border border-green-500/30 mb-4 animate-scale-in">
                                        <Play className="w-12 h-12 text-green-400 fill-current" />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">{movie.title}</h2>
                                    <p className="text-green-400 font-medium mt-2 uppercase tracking-widest text-sm">Correct Answer</p>
                                </>
                            )}
                            {feedback === "incorrect" && (
                                <>
                                    <div className="bg-red-500/20 p-6 rounded-full border border-red-500/30 mb-4 animate-scale-in">
                                        <X className="w-12 h-12 text-red-400" />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight md:opacity-50">{movie.title}</h2>
                                    <p className="text-red-400 font-medium mt-2 uppercase tracking-widest text-sm">Time's Up</p>
                                </>
                            )}
                        </div>

                        {/* Controls Overlay (Bottom) */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 p-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl transition-opacity duration-300 hover:bg-black/60">
                            <button
                                onClick={() => handleFrameChange(-1)}
                                disabled={frameOffset <= -3 || feedback !== "none"}
                                className="p-3 rounded-xl bg-white/5 hover:bg-indigo-600 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all active:scale-95 group"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col items-center min-w-[100px]">
                                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time Shift</span>
                                <span className={cn(
                                    "text-xl font-mono font-bold tracking-tighter tabular-nums",
                                    frameOffset === 0 ? "text-white" : frameOffset > 0 ? "text-indigo-400" : "text-amber-400"
                                )}>
                                    {frameOffset > 0 ? `+${frameOffset * 20}s` : frameOffset < 0 ? `${frameOffset * 20}s` : "0s"}
                                </span>
                            </div>

                            <button
                                onClick={() => handleFrameChange(1)}
                                disabled={frameOffset >= 3 || feedback !== "none"}
                                className="p-3 rounded-xl bg-white/5 hover:bg-indigo-600 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all active:scale-95"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <form onSubmit={checkAnswer} className="w-full max-w-2xl relative group mt-4">
                    <div className={cn(
                        "absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-0 blur transition-opacity duration-500",
                        isInputFocused ? "opacity-30" : "group-hover:opacity-20"
                    )} />
                    <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border-2 transition-colors border-white/10 rounded-2xl overflow-hidden focus-within:border-indigo-500/50 shadow-2xl">
                        <input
                            id="guess-input"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            placeholder="Type movie or character name..."
                            className="flex-1 bg-transparent px-6 py-5 text-xl text-white placeholder:text-slate-500 outline-none w-full"
                            autoFocus
                            autoComplete="off"
                            disabled={feedback !== "none"}
                        />
                        <div className="pr-3">
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || feedback !== "none"}
                                className="px-6 py-2.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-indigo-500 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-950 transition-all active:scale-95"
                            >
                                Guess
                            </button>
                        </div>
                    </div>
                </form>

            </main>
        </div>
    );
}
