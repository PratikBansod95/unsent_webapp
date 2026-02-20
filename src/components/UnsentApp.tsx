"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GlowButton from "./GlowButton";
import TextDisassembly from "./TextDisassembly";
import GlowBackground from "./GlowBackground";

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
            timerRef.current = window.setTimeout(() => {
                setState("paused");
            }, 5000);
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
                releaseRef.current = null;
            }
        };
    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        if (newText.length > 0) {
            if (state !== "writing") setState("writing");
        } else {
            setState("empty");
        }
    };

    const dismissKeyboard = () => {
        textareaRef.current?.blur();
    };

    const handleRelease = () => {
        if (!text.trim().length) return;

        dismissKeyboard();
        setState("releasing");

        if (releaseRef.current) {
            window.clearTimeout(releaseRef.current);
            releaseRef.current = null;
        }

        releaseRef.current = window.setTimeout(() => {
            setState("released");
            setText("");
            releaseRef.current = null;
        }, reduceMotion ? 500 : 3000);
    };

    const handleWriteAgain = () => {
        setState("empty");
        setText("");
        requestAnimationFrame(() => textareaRef.current?.focus());
    };

    return (
        <div className="relative z-20 h-full w-full max-w-5xl px-4 py-4 md:px-8 md:py-8">
            <div className="relative h-full rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-[2px]">
                <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />

                <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 pt-5 md:px-8">
                    <div className="font-display text-[20px] tracking-[0.08em] text-white/82">Unsent</div>
                    <div className="text-[11px] tracking-[0.08em] uppercase text-white/48">
                        Private by design
                    </div>
                </header>

                <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-5 pb-4 md:px-8 md:pb-6">
                    <p className="text-[11px] leading-relaxed tracking-[0.03em] text-white/38">
                        This page does not save, share, or remember what you write.
                    </p>
                </footer>

                <div className="pointer-events-none absolute inset-0 flex items-end justify-center z-0">
                    <GlowBackground active={state === "releasing"} />
                </div>

                <div className="relative z-30 flex h-full flex-col px-3 pb-20 pt-20 md:px-6 md:pt-24">
                    <AnimatePresence mode="wait">
                        {(state === "empty" || state === "writing" || state === "paused") && (
                            <motion.textarea
                                ref={textareaRef}
                                key="textarea"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: reduceMotion ? 0.15 : 0.45 }}
                                className="h-full w-full resize-none bg-transparent px-2 pb-4 text-[18px] leading-[1.8] text-[#E6E6EB] outline-none caret-[#E6E6EB] placeholder:text-white/38"
                                placeholder="Write it.\nNo one will read it."
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
                            <div className="h-full w-full">
                                <TextDisassembly key="disassembly" text={text} />
                            </div>
                        )}

                        {state === "released" && (
                            <motion.div
                                key="released"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: reduceMotion ? 0.15 : 1, ease: "easeIn" }}
                                className="flex h-full flex-col items-center justify-center gap-8 px-4 text-center"
                            >
                                <p className="font-display text-[30px] leading-tight text-[#F0ECE8]/90 md:text-[36px]">
                                    You don&apos;t have to carry that anymore.
                                </p>
                                <GlowButton onClick={handleWriteAgain} text="Write Again" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {state === "paused" && (
                        <motion.div
                            key="release-btn"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: reduceMotion ? 0.15 : 0.8, ease: "easeInOut" }}
                            className="absolute bottom-16 left-1/2 z-50 -translate-x-1/2"
                        >
                            <GlowButton onClick={handleRelease} text="Release" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
