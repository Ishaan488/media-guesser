"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getRandomMovie, Movie } from "@/lib/movies";
import styles from "./Game.module.css";

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

    // Load initial movie
    const loadNewMovie = useCallback(() => {
        const newMovie = getRandomMovie(genre);
        if (!newMovie && !movie) {
            // Handle no movies found
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
            // Move to next movie even if failed (as per "else loose and next movie comes")
            // But maybe reset score? Or just keep going?
            // Prompt says "score will be calculated on correct".
            // Let's just create a continuous loop.
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
            // Optional: Shake effect or visual feedback for wrong answer?
            // For now just clear input or show error briefly
            // But the prompt says "if he guesses right in that 60 seconds"
            // It implies you can try multiple times.
            const input = document.getElementById("guess-input");
            input?.classList.add(styles.shake);
            setTimeout(() => input?.classList.remove(styles.shake), 500);
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

    if (!movie) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button onClick={() => router.push("/")} className={styles.backButton}>
                    &larr; Exit
                </button>
                <div className={styles.scoreBoard}>
                    <span className={styles.scoreLabel}>Score</span>
                    <span className={styles.scoreValue}>{score}</span>
                </div>
            </header>

            <main className={styles.gameArea}>
                <div className={styles.timerBar}>
                    <div
                        className={styles.timerFill}
                        style={{ width: `${(timeLeft / 60) * 100}%`, backgroundColor: timeLeft < 10 ? '#ef4444' : '#8b5cf6' }}
                    />
                </div>

                <div className={styles.frameContainer}>
                    <div className={styles.imageWrapper}>
                        {/* Using mock images from data */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={movie.frames[frameOffset]}
                            alt="Movie Frame"
                            className={styles.frameImage}
                        />
                        {feedback === "correct" && (
                            <div className={styles.overlayCorrect}>
                                Correct!
                                <div className={styles.movieTitle}>{movie.title}</div>
                            </div>
                        )}
                        {feedback === "incorrect" && (
                            <div className={styles.overlayIncorrect}>
                                Time Up!
                                <div className={styles.movieTitle}>{movie.title}</div>
                            </div>
                        )}
                    </div>

                    <div className={styles.controls}>
                        <button
                            onClick={() => handleFrameChange(-1)}
                            disabled={frameOffset <= -3}
                            className={styles.controlButton}
                        >
                            -20s
                        </button>
                        <div className={styles.indicator}>
                            T{frameOffset > 0 ? `+${frameOffset * 20}` : frameOffset * 20}s
                        </div>
                        <button
                            onClick={() => handleFrameChange(1)}
                            disabled={frameOffset >= 3}
                            className={styles.controlButton}
                        >
                            +20s
                        </button>
                    </div>
                </div>

                <form onSubmit={checkAnswer} className={styles.inputForm}>
                    <input
                        id="guess-input"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type movie or character name..."
                        className={styles.input}
                        autoFocus
                        autoComplete="off"
                        disabled={feedback !== "none"}
                    />
                    <button type="submit" className={styles.submitButton} disabled={feedback !== "none"}>
                        Guess
                    </button>
                </form>
            </main>
        </div>
    );
}
