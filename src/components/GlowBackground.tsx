"use client";

import { motion } from "framer-motion";

interface GlowBackgroundProps {
    active: boolean;
}

export default function GlowBackground({ active }: GlowBackgroundProps) {
    // Animation variants matching the spec
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

    if (!active) return null;

    return (
        <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-end justify-center pointer-events-none z-0 overflow-visible">
            {/* Layer 1: Outer Glow (Diffuse Warmth) */}
            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-[120vw] h-[60vw] rounded-full blur-[120px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(232,168,124,0.08) 0%, rgba(232,168,124,0.04) 40%, rgba(217,149,107,0.02) 70%, transparent 100%)",
                    transform: "translateY(50%) scale(1.2)"
                }}
            />

            {/* Layer 2: Middle Glow (Main Body) */}
            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-[100vw] h-[50vw] rounded-full blur-[80px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(232,168,124,0.18) 0%, rgba(232,168,124,0.12) 35%, rgba(232,168,124,0.05) 65%, transparent 100%)",
                    transform: "translateY(40%) scale(0.85)"
                }}
            />

            {/* Layer 3: Inner Core (Bright Center) */}
            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-[60vw] h-[30vw] rounded-full blur-[60px] mix-blend-screen"
                style={{
                    background: "radial-gradient(circle, rgba(255,184,140,0.25) 0%, rgba(232,168,124,0.15) 50%, transparent 100%)",
                    transform: "translateY(30%) scale(0.5)"
                }}
            />

            {/* Layer 4: Color Wash (Background Warmth) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.2, 0.4, 0.2, 0] }} // Peaks when intensity > 0.4
                transition={{ duration: 2.8, times: [0, 0.2, 0.5, 0.8, 1] }}
                className="absolute inset-0 w-full h-full z-[-1]"
                style={{
                    background: "linear-gradient(to top, rgba(232,168,124,0.1) 0%, transparent 40%)"
                }}
            />
        </div>
    );
}
