"use client";

import Link from "next/link";
import styles from "./page.module.css";

const genres = ["Action", "Comedy", "Sci-Fi", "Random"];

export default function Home() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>CineGuesser</h1>
            <p className={styles.subtitle}>Test your movie knowledge based on a single frame.</p>

            <div className={styles.grid}>
                {genres.map((genre) => (
                    <Link
                        key={genre}
                        href={`/game?genre=${genre}`}
                        className={styles.card}
                    >
                        <h2>{genre} &rarr;</h2>
                        <p>Start guessing {genre === "Random" ? "movies from any genre" : `${genre.toLowerCase()} movies`}.</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
