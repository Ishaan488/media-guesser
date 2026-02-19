export type Movie = {
    id: string;
    title: string;
    character?: string;
    genre: string;
    frames: Record<number, string>; // -3 to +3
};

const movieData: Movie[] = [
    {
        id: "1",
        title: "Inception",
        genre: "Action",
        frames: {
            0: "https://placehold.co/800x450/1e293b/FFFFFF?text=Inception+Scene+Middle",
            1: "https://placehold.co/800x450/1e293b/FFFFFF?text=Inception+Scene+Forward+20s",
            2: "https://placehold.co/800x450/1e293b/FFFFFF?text=Inception+Scene+Forward+40s",
            3: "https://placehold.co/800x450/1e293b/FFFFFF?text=Inception+Scene+Forward+60s",
            "-1": "https://placehold.co/800x450/1e293b/FFFFFF?text=Inception+Scene+Back+20s",
            "-2": "https://placehold.co/800x450/1e293b/FFFFFF?text=Inception+Scene+Back+40s",
            "-3": "https://placehold.co/800x450/1e293b/FFFFFF?text=Inception+Scene+Back+60s",
        },
    },
    {
        id: "2",
        title: "The Dark Knight",
        genre: "Action",
        frames: {
            0: "https://placehold.co/800x450/0f172a/FFFFFF?text=Dark+Knight+Scene",
            1: "https://placehold.co/800x450/0f172a/FFFFFF?text=Dark+Knight+Scene+Forward+20s",
            2: "https://placehold.co/800x450/0f172a/FFFFFF?text=Dark+Knight+Scene+Forward+40s",
            3: "https://placehold.co/800x450/0f172a/FFFFFF?text=Dark+Knight+Scene+Forward+60s",
            "-1": "https://placehold.co/800x450/0f172a/FFFFFF?text=Dark+Knight+Scene+Back+20s",
            "-2": "https://placehold.co/800x450/0f172a/FFFFFF?text=Dark+Knight+Scene+Back+40s",
            "-3": "https://placehold.co/800x450/0f172a/FFFFFF?text=Dark+Knight+Scene+Back+60s",
        },
    },
    {
        id: "3",
        title: "Superbad",
        genre: "Comedy",
        frames: {
            0: "https://placehold.co/800x450/f59e0b/FFFFFF?text=Superbad+Scene",
            1: "https://placehold.co/800x450/f59e0b/FFFFFF?text=Superbad+Scene+Forward+20s",
            2: "https://placehold.co/800x450/f59e0b/FFFFFF?text=Superbad+Scene+Forward+40s",
            3: "https://placehold.co/800x450/f59e0b/FFFFFF?text=Superbad+Scene+Forward+60s",
            "-1": "https://placehold.co/800x450/f59e0b/FFFFFF?text=Superbad+Scene+Back+20s",
            "-2": "https://placehold.co/800x450/f59e0b/FFFFFF?text=Superbad+Scene+Back+40s",
            "-3": "https://placehold.co/800x450/f59e0b/FFFFFF?text=Superbad+Scene+Back+60s",
        },
    },
    {
        id: "4",
        title: "Interstellar",
        genre: "Sci-Fi",
        frames: {
            0: "https://placehold.co/800x450/4f46e5/FFFFFF?text=Interstellar+Space",
            1: "https://placehold.co/800x450/4f46e5/FFFFFF?text=Interstellar+Space+20s",
            2: "https://placehold.co/800x450/4f46e5/FFFFFF?text=Interstellar+Space+40s",
            3: "https://placehold.co/800x450/4f46e5/FFFFFF?text=Interstellar+Space+60s",
            "-1": "https://placehold.co/800x450/4f46e5/FFFFFF?text=Interstellar+Space-20s",
            "-2": "https://placehold.co/800x450/4f46e5/FFFFFF?text=Interstellar+Space-40s",
            "-3": "https://placehold.co/800x450/4f46e5/FFFFFF?text=Interstellar+Space-60s",
        }
    },
    {
        id: "5",
        title: "Titanic",
        genre: "Romance",
        character: "Jack",
        frames: {
            0: "https://placehold.co/800x450/3b82f6/FFFFFF?text=Titanic+Scene",
            1: "https://placehold.co/800x450/3b82f6/FFFFFF?text=Titanic+Scene+20s",
            2: "https://placehold.co/800x450/3b82f6/FFFFFF?text=Titanic+Scene+40s",
            3: "https://placehold.co/800x450/3b82f6/FFFFFF?text=Titanic+Scene+60s",
            "-1": "https://placehold.co/800x450/3b82f6/FFFFFF?text=Titanic+Scene-20s",
            "-2": "https://placehold.co/800x450/3b82f6/FFFFFF?text=Titanic+Scene-40s",
            "-3": "https://placehold.co/800x450/3b82f6/FFFFFF?text=Titanic+Scene-60s",
        }
    },
    {
        id: "6",
        title: "The Matrix",
        genre: "Sci-Fi",
        character: "Neo",
        frames: {
            0: "https://placehold.co/800x450/22c55e/000000?text=Matrix+Code",
            1: "https://placehold.co/800x450/22c55e/000000?text=Matrix+Code+20s",
            2: "https://placehold.co/800x450/22c55e/000000?text=Matrix+Code+40s",
            3: "https://placehold.co/800x450/22c55e/000000?text=Matrix+Code+60s",
            "-1": "https://placehold.co/800x450/22c55e/000000?text=Matrix+Code-20s",
            "-2": "https://placehold.co/800x450/22c55e/000000?text=Matrix+Code-40s",
            "-3": "https://placehold.co/800x450/22c55e/000000?text=Matrix+Code-60s",
        }
    }
];

export const getMoviesByGenre = (genre: string) => {
    if (genre === "Random") return movieData;
    return movieData.filter(m => m.genre === genre);
};

export const getRandomMovie = (genre: string) => {
    const movies = getMoviesByGenre(genre);
    if (movies.length === 0) return null;
    return movies[Math.floor(Math.random() * movies.length)];
}
