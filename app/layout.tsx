import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "CineGuesser",
    description: "Test your movie knowledge!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
