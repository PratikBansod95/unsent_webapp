"use client";

import { motion } from "framer-motion";

interface GlowBackgroundProps {
    active: boolean;
}

export default function GlowBackground({ active }: GlowBackgroundProps) {
    const variants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
            opacity: [0, 0.4, 0.7, 0.55, 0.35],
            scale: [0.8, 1.8, 1.5],
            transition: {
                opacity: {
                    duration: 2.8,
                    times: [0, 0.14, 0.39, 0.6, 1],
                    ease: "easeInOut" as const
                },
                scale: {
                    duration: 2.8,
                    times: [0, 0.39, 1],
                    ease: "easeInOut" as const
                }
            }
        },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 1 } }
    };

    if (!active) {
        return null;
    }

    return (
        <div className="absolute inset-x-0 bottom-0 top-1/2 overflow-visible pointer-events-none">
            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute left-1/2 top-1/2 h-[60vw] w-[120vw] -translate-x-1/2 -translate-y-[5%] rounded-full blur-[120px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(232,168,124,0.08) 0%, rgba(232,168,124,0.04) 40%, rgba(217,149,107,0.02) 70%, transparent 100%)",
                }}
            />

            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute left-1/2 top-1/2 h-[50vw] w-[100vw] -translate-x-1/2 -translate-y-[7%] rounded-full blur-[80px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(232,168,124,0.18) 0%, rgba(232,168,124,0.12) 35%, rgba(232,168,124,0.05) 65%, transparent 100%)",
                }}
            />

            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute left-1/2 top-1/2 h-[30vw] w-[60vw] -translate-x-1/2 -translate-y-[10%] rounded-full blur-[60px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(255,184,140,0.25) 0%, rgba(232,168,124,0.15) 50%, transparent 100%)",
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.2, 0.4, 0.2, 0] }}
                transition={{ duration: 2.8, times: [0, 0.2, 0.5, 0.8, 1] }}
                className="absolute inset-0 z-[-1] h-full w-full"
                style={{
                    background: "linear-gradient(to top, rgba(232,168,124,0.1) 0%, transparent 40%)",
                }}
            />
        </div>
    );
}
