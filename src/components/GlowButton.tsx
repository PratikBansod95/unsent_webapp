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
            className="px-8 py-3 rounded-full bg-black/40 border border-[#E8A87C]/30 text-[#E6E6EB]/90 text-base tracking-wide transition-all duration-300 outline-none backdrop-blur-sm"
            style={{
                boxShadow: `
                    0 10px 32px 4px rgba(232,168,124,0.2),
                    0 6px 20px 1px rgba(232,168,124,0.35),
                    0 4px 12px 0px rgba(255,184,140,0.25)
                `
            }}
            whileHover={{
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
