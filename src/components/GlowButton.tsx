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
            className="min-w-[280px] rounded-full border border-[#EEDBC9]/18 bg-[#9F8B7B]/88 px-10 py-4 text-xl tracking-[0.02em] text-[#F5EFEB]/95 outline-none transition-all duration-300 backdrop-blur-sm md:min-w-[340px] md:py-5"
            style={{
                boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.03) inset,
                    0 24px 80px 14px rgba(236,188,149,0.45),
                    0 12px 42px 2px rgba(236,188,149,0.55)
                `,
            }}
            whileHover={{
                scale: 1.01,
                boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.05) inset,
                    0 26px 92px 18px rgba(236,188,149,0.5),
                    0 14px 46px 4px rgba(236,188,149,0.6)
                `,
            }}
        >
            {text}
        </motion.button>
    );
}
