"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface TextDisassemblyProps {
    text: string;
}

const seededNoise = (seed: number) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
};

export default function TextDisassembly({ text }: TextDisassemblyProps) {
    const characters = useMemo(
        () =>
            text.split("").map((character, index) => ({
                id: `${character}-${index}`,
                character,
                y: 15 + seededNoise(index + 1) * 40,
                x: seededNoise(index + 19) * 8 - 4,
                rotate: seededNoise(index + 37) * 0.16 - 0.08,
                delay: seededNoise(index + 59) * 0.25,
            })),
        [text]
    );

    return (
        <div className="h-full w-full overflow-hidden whitespace-pre-wrap break-words text-center text-[clamp(2rem,7.4vw,3.7rem)] font-light leading-[1.44] text-white/64 pointer-events-none">
            {characters.map((char) => (
                <motion.span
                    key={char.id}
                    initial={{ opacity: 1, y: 0, rotate: 0 }}
                    animate={{
                        opacity: [1, 0.85, 0.15, 0],
                        y: char.y,
                        x: char.x,
                        rotate: char.rotate,
                        filter: ["blur(0px)", "blur(2px)"],
                    }}
                    transition={{
                        duration: 2.8,
                        ease: "easeInOut",
                        delay: char.delay,
                    }}
                    className="inline-block"
                >
                    {char.character === " " ? "\u00A0" : char.character}
                </motion.span>
            ))}
        </div>
    );
}
