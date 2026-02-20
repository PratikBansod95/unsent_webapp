"use client";

import { motion } from "framer-motion";

interface GlowBackgroundProps {
    mode: "none" | "paused" | "releasing" | "released";
}

export default function GlowBackground({ mode }: GlowBackgroundProps) {
    if (mode === "none") return null;

    const releasing = mode === "releasing";
    const settled = mode === "released";

    const variants = {
        initial: { opacity: settled ? 0.22 : 0.08, scale: settled ? 1.25 : 1.08 },
        animate: {
            opacity: releasing
                ? [0.1, 0.35, 0.72, 0.55, 0.38]
                : settled
                    ? [0.24, 0.29, 0.24]
                    : [0.08, 0.15, 0.11],
            scale: releasing
                ? [1.0, 1.85, 1.5]
                : settled
                    ? [1.22, 1.28, 1.22]
                    : [1.06, 1.1, 1.06],
            transition: {
                opacity: {
                    duration: releasing ? 2.8 : 4.8,
                    repeat: releasing ? 0 : Infinity,
                    ease: "easeInOut" as const,
                },
                scale: {
                    duration: releasing ? 2.8 : 4.8,
                    repeat: releasing ? 0 : Infinity,
                    ease: "easeInOut" as const,
                },
            },
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.9 } },
    };

    return (
        <div className="absolute inset-x-0 bottom-0 top-1/2 overflow-visible pointer-events-none">
            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute left-1/2 top-1/2 h-[70vw] w-[130vw] -translate-x-1/2 translate-y-[8%] rounded-full blur-[130px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(241,196,160,0.1) 0%, rgba(232,168,124,0.06) 40%, rgba(217,149,107,0.03) 70%, transparent 100%)",
                }}
            />

            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute left-1/2 top-1/2 h-[52vw] w-[100vw] -translate-x-1/2 translate-y-[12%] rounded-full blur-[95px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(232,168,124,0.24) 0%, rgba(232,168,124,0.16) 35%, rgba(232,168,124,0.07) 65%, transparent 100%)",
                }}
            />

            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute left-1/2 top-1/2 h-[34vw] w-[66vw] -translate-x-1/2 translate-y-[15%] rounded-full blur-[70px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(255,210,170,0.34) 0%, rgba(232,168,124,0.2) 50%, transparent 100%)",
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: releasing ? [0.06, 0.2, 0.36, 0.22, 0.14] : settled ? [0.2, 0.3, 0.24] : [0.08, 0.16, 0.12],
                }}
                transition={{
                    duration: releasing ? 2.8 : 4.8,
                    repeat: releasing ? 0 : Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 z-[-1] h-full w-full"
                style={{
                    background: "linear-gradient(to top, rgba(236,173,129,0.22) 0%, rgba(236,173,129,0.08) 28%, transparent 55%)",
                }}
            />
        </div>
    );
}
