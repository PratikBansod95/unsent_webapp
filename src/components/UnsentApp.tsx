"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlowButton from "./GlowButton";
import TextDisassembly from "./TextDisassembly";
import GlowBackground from "./GlowBackground";

type AppState = "empty" | "writing" | "paused" | "releasing" | "released";

export default function UnsentApp() {
    const [state, setState] = useState<AppState>("empty");
    const [text, setText] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Logic for inactivity timer
    useEffect(() => {
        // Only run timer if we have text
        if ((state === "writing" || state === "paused") && text.length > 0) {
            if (timerRef.current) clearTimeout(timerRef.current);

            // If we are writing, start timer to go to paused
            if (state === "writing") {
                timerRef.current = setTimeout(() => {
                    setState("paused");
                }, 5000); // 5 seconds
            }
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [text, state]);

    // Handle text change
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        if (newText.length > 0) {
            // Whenever we type, we go to writing state (even if coming from paused)
            if (state !== "writing") setState("writing");
        } else {
            setState("empty");
        }
    };

    const handleRelease = () => {
        setState("releasing");
        // After 3s (2.8s animation + delay), switch to released
        setTimeout(() => {
            setState("released");
            setText("");
        }, 3000);
    };

    const handleWriteAgain = () => {
        setState("empty");
        setText("");
    };

    return (
        <div className="relative w-full h-full max-w-4xl mx-auto flex flex-col items-center justify-center p-6 text-center z-20 font-light">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <GlowBackground active={state === "releasing"} />
            </div>

            <AnimatePresence mode="wait">
                {(state === "empty" || state === "writing" || state === "paused") && (
                    <motion.textarea
                        key="textarea"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full bg-transparent resize-none outline-none text-[#E6E6EB] text-lg font-light leading-[1.8] placeholder-white/40 caret-[#E6E6EB] z-30 relative font-sans"
                        placeholder="Write it.\nNo one will read it."
                        value={text}
                        onChange={handleTextChange}
                        spellCheck={false}
                        autoFocus
                    />
                )}

                {state === "releasing" && (
                    <div className="w-full h-full z-30 relative">
                        <TextDisassembly key="disassembly" text={text} />
                    </div>
                )}

                {state === "released" && (
                    <motion.div
                        key="released"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "easeIn" }}
                        className="flex flex-col items-center justify-center space-y-8 z-30"
                    >
                        <p className="text-xl text-[#E6E6EB]/85 font-light">You don't have to carry that anymore.</p>
                        <GlowButton onClick={handleWriteAgain} text="Write Again" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Release Button */}
            <AnimatePresence>
                {state === "paused" && (
                    <motion.div
                        key="release-btn"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute bottom-12 z-40"
                    >
                        <GlowButton onClick={handleRelease} text="Release" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
