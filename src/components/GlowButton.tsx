"use client";

import { motion } from "framer-motion";

interface GlowButtonProps {
    onClick: () => void;
    text: string;
}

export default function GlowButton({ onClick, text }: GlowButtonProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className="rounded-full border border-[#E8A87C]/30 bg-black/45 px-8 py-3 text-base tracking-[0.08em] text-[#E6E6EB]/92 outline-none transition-all duration-300 backdrop-blur-sm"
            style={{
                boxShadow: `
                    0 10px 32px 4px rgba(232,168,124,0.2),
                    0 6px 20px 1px rgba(232,168,124,0.35),
                    0 4px 12px 0px rgba(255,184,140,0.25)
                `
            }}
            whileHover={{
                scale: 1.01,
                boxShadow: `
                    0 15px 40px 6px rgba(232,168,124,0.25),
                    0 10px 25px 3px rgba(232,168,124,0.45),
                    0 6px 16px 2px rgba(255,184,140,0.35)
                `
            }}
        >
            {text}
        </motion.button>
    );
}
