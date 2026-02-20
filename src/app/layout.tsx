import type { Metadata } from "next";
import type { Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-ui",
});

const newsreader = Newsreader({
    subsets: ["latin"],
    variable: "--font-display",
});

export const metadata: Metadata = {
    title: "Unsent",
    description: "Write something heavy... and gently set it down.",
    applicationName: "Unsent",
    manifest: "/manifest.json",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#0F1115",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${manrope.variable} ${newsreader.variable}`}>{children}</body>
        </html>
    );
}
