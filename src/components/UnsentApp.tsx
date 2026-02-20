"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GlowButton from "./GlowButton";
import TextDisassembly from "./TextDisassembly";
import GlowBackground from "./GlowBackground";
import CosmicBackground from "./CosmicBackground";

type AppState = "empty" | "writing" | "paused" | "releasing" | "released";

export default function UnsentApp() {
    const [state, setState] = useState<AppState>("empty");
    const [text, setText] = useState("");
    const timerRef = useRef<number | null>(null);
    const releaseRef = useRef<number | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (state === "writing" && text.trim().length > 0) {
            timerRef.current = window.setTimeout(() => setState("paused"), 5000);
        }

        return () => {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [state, text]);

    useEffect(() => {
        return () => {
            if (releaseRef.current) {
                window.clearTimeout(releaseRef.current);
            }
        };
    }, []);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nextText = event.target.value;
        setText(nextText);
        if (nextText.trim().length === 0) setState("empty");
        else if (state !== "writing") setState("writing");
    };

    const handleRelease = () => {
        if (!text.trim().length) return;

        textareaRef.current?.blur();
        setState("releasing");

        if (releaseRef.current) {
            window.clearTimeout(releaseRef.current);
            releaseRef.current = null;
        }

        releaseRef.current = window.setTimeout(() => {
            setState("released");
            setText("");
            releaseRef.current = null;
        }, reduceMotion ? 400 : 3000);
    };

    const handleWriteAgain = () => {
        setState("empty");
        setText("");
        requestAnimationFrame(() => textareaRef.current?.focus());
    };

    const glowMode =
        state === "releasing" ? "releasing" : state === "paused" ? "paused" : state === "released" ? "released" : "none";

    return (
        <div className="relative h-full w-full overflow-hidden">
            <CosmicBackground />

            <div className="cosmos-vignette pointer-events-none absolute inset-0 z-10" />
            <div className="cosmos-stripes pointer-events-none absolute inset-0 z-10" />

            <div className="pointer-events-none absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-20 h-[64px] w-[64px] rounded-full border border-[#BBAEF6]/60 bg-[#A792FF]/18 shadow-[0_0_26px_6px_rgba(157,133,255,0.28)] md:right-8 md:top-14 md:h-[94px] md:w-[94px] md:shadow-[0_0_30px_8px_rgba(157,133,255,0.28)]">
                <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(210,190,255,0.8)_0%,rgba(179,154,255,0.35)_45%,transparent_80%)]" />
                <motion.div
                    className="absolute inset-0 rounded-full border border-[#C9BEFF]/35"
                    animate={{ opacity: [0.45, 0.7, 0.45], scale: [0.98, 1.02, 0.98] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <header className="pointer-events-none absolute inset-x-0 top-[max(2.6rem,env(safe-area-inset-top)+1.2rem)] z-30 text-center md:top-[88px]">
                <h1 className="text-[clamp(2.1rem,9.2vw,3.9rem)] font-light tracking-[0.09em] text-white/60">Unsent</h1>
            </header>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 z-10">
                <GlowBackground mode={glowMode} />
            </div>

            <main className="relative z-30 flex h-full w-full flex-col items-center">
                <AnimatePresence mode="wait">
                    {(state === "empty" || state === "writing" || state === "paused") && (
                        <motion.textarea
                            ref={textareaRef}
                            key="textarea"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0.15 : 0.45 }}
                            className="h-full w-full resize-none bg-transparent px-6 pb-[max(8.5rem,calc(env(safe-area-inset-bottom)+7rem))] pt-[35vh] text-center text-[clamp(2rem,7.8vw,3.7rem)] font-light leading-[1.44] text-white/75 outline-none caret-white/75 placeholder:text-white/26 md:px-20 md:pt-[40vh] md:pb-32"
                            placeholder="Write what you never had the chance to say"
                            value={text}
                            onChange={handleTextChange}
                            spellCheck={false}
                            autoFocus
                            onKeyDown={(event) => {
                                if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && state === "paused") {
                                    event.preventDefault();
                                    handleRelease();
                                }
                            }}
                        />
                    )}

                    {state === "releasing" && (
                        <motion.div key="disassembly" className="h-full w-full px-6 pt-[35vh] md:px-20 md:pt-[40vh]">
                            <TextDisassembly text={text} />
                        </motion.div>
                    )}

                    {state === "released" && (
                        <motion.div
                            key="released"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: reduceMotion ? 0.15 : 1 }}
                            className="flex h-full w-full items-center justify-center px-6 pb-[max(8rem,calc(env(safe-area-inset-bottom)+6.5rem))] pt-[31vh] text-center md:px-20 md:pb-28 md:pt-[34vh]"
                        >
                            <p className="text-[clamp(2rem,7.6vw,3.8rem)] font-light leading-[1.35] text-white/82">
                                You don&apos;t have to carry that anymore.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <AnimatePresence>
                {state === "paused" && (
                    <motion.div
                        key="release-btn"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: reduceMotion ? 0.15 : 0.8, ease: "easeInOut" }}
                        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 md:bottom-14"
                    >
                        <GlowButton onClick={handleRelease} text="Release" />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {state === "released" && (
                    <motion.div
                        key="write-again-btn"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: reduceMotion ? 0.15 : 0.8, ease: "easeInOut" }}
                        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 md:bottom-14"
                    >
                        <GlowButton onClick={handleWriteAgain} text="Write again" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
