"use client";

import { motion } from "framer-motion";

interface TextDisassemblyProps {
    text: string;
}

export default function TextDisassembly({ text }: TextDisassemblyProps) {
    const characters = text.split("");

    return (
        <div className="w-full h-full flex flex-wrap content-start text-left text-[#E6E6EB] text-lg font-light leading-[1.8] pointer-events-none whitespace-pre-wrap break-words p-6 overflow-hidden">
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 1, y: 0, rotate: 0 }}
                    animate={{
                        opacity: [1, 0.85, 0.15, 0],
                        y: Math.random() * 40 + 15, // 15-55px range
                        x: Math.random() * 8 - 4, // +/- 4px spread
                        rotate: Math.random() * 0.16 - 0.08, // +/- 0.08 rad
                        filter: ["blur(0px)", "blur(2px)"]
                    }}
                    transition={{
                        duration: 2.8,
                        ease: "easeInOut",
                        delay: Math.random() * 0.25 // Staggered
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
}
