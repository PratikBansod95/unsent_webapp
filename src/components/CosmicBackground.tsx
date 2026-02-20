"use client";

import { useEffect, useRef } from "react";

type Star = {
    x: number;
    y: number;
    r: number;
    a: number;
    speed: number;
    drift: number;
    twinkle: number;
    warm: boolean;
};

type Streak = {
    x: number;
    y: number;
    life: number;
    ttl: number;
    len: number;
    vx: number;
    vy: number;
};

const STAR_COUNT = 950;
const WARM_STAR_RATIO = 0.14;

const seededNoise = (seed: number) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
};

export default function CosmicBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrame = 0;
        let time = 0;
        const stars: Star[] = [];
        const streaks: Streak[] = [];

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const initStars = () => {
            stars.length = 0;
            for (let i = 0; i < STAR_COUNT; i += 1) {
                const noiseA = seededNoise(i + 1);
                const noiseB = seededNoise(i + 17);
                const noiseC = seededNoise(i + 97);
                stars.push({
                    x: noiseA * width,
                    y: noiseB * height,
                    r: 0.35 + noiseC * 2.2,
                    a: 0.18 + seededNoise(i + 211) * 0.75,
                    speed: 0.02 + seededNoise(i + 303) * 0.18,
                    drift: -0.03 + seededNoise(i + 401) * 0.06,
                    twinkle: 0.5 + seededNoise(i + 509) * 1.8,
                    warm: seededNoise(i + 601) < WARM_STAR_RATIO,
                });
            }
        };

        const draw = () => {
            time += 0.016;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < stars.length; i += 1) {
                const star = stars[i];
                star.y += star.speed;
                star.x += star.drift;

                if (star.y > height + 2) star.y = -2;
                if (star.x > width + 2) star.x = -2;
                if (star.x < -2) star.x = width + 2;

                const twinkle = 0.75 + Math.sin(time * star.twinkle + i) * 0.25;
                const alpha = star.a * twinkle;
                const lowerHalf = star.y / height;

                if (star.warm && lowerHalf > 0.32) {
                    ctx.fillStyle = `rgba(232, 182, 143, ${alpha * (lowerHalf * 0.8)})`;
                } else {
                    ctx.fillStyle = `rgba(236, 239, 246, ${alpha})`;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fill();
            }

            if (Math.random() < 0.005) {
                streaks.push({
                    x: width * (0.08 + Math.random() * 0.84),
                    y: height * (0.12 + Math.random() * 0.32),
                    life: 0,
                    ttl: 0.9 + Math.random() * 0.6,
                    len: 30 + Math.random() * 55,
                    vx: -65 - Math.random() * 45,
                    vy: 120 + Math.random() * 70,
                });
            }

            for (let i = streaks.length - 1; i >= 0; i -= 1) {
                const streak = streaks[i];
                streak.life += 0.016;
                streak.x += streak.vx * 0.016;
                streak.y += streak.vy * 0.016;
                const progress = streak.life / streak.ttl;
                if (progress >= 1) {
                    streaks.splice(i, 1);
                    continue;
                }

                const alpha = progress < 0.35 ? progress / 0.35 : (1 - progress) / 0.65;
                const x2 = streak.x + streak.len * 0.25;
                const y2 = streak.y - streak.len;
                const gradient = ctx.createLinearGradient(streak.x, streak.y, x2, y2);
                gradient.addColorStop(0, `rgba(255,242,220,${alpha * 0.95})`);
                gradient.addColorStop(1, "rgba(255,242,220,0)");
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(streak.x, streak.y);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            animationFrame = window.requestAnimationFrame(draw);
        };

        resize();
        initStars();
        draw();

        const onResize = () => {
            resize();
            initStars();
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
        />
    );
}
