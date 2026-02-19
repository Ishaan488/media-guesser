import { Suspense } from "react";
import Game from "@/components/Game";

export default function GamePage() {
    return (
        <Suspense fallback={<div>Loading game...</div>}>
            <Game />
        </Suspense>
    );
}
