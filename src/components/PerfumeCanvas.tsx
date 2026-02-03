"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface PerfumeCanvasProps {
    scrollProgress: MotionValue<number>;
    frameCount: number;
    onLoaded?: () => void;
}

const PerfumeCanvas: React.FC<PerfumeCanvasProps> = ({ scrollProgress, frameCount, onLoaded }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Rendering logic
    const drawFrame = useCallback((progress: number) => {
        if (!canvasRef.current || imagesRef.current.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
        );

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete) return;

        // Set internal resolution to image size
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
    }, [frameCount]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = `/sequence/frame_${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                setImagesLoaded(loadedCount);
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                    onLoaded?.();
                    // Initial draw
                    drawFrame(scrollProgress.get());
                }
            };
            img.onerror = () => {
                console.error(`Failed to load frame: /sequence/frame_${i}.jpg`);
                loadedCount++; // Still count it to avoid getting stuck, or handle error
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                    onLoaded?.();
                }
            };
            images.push(img);
        }
        imagesRef.current = images;
    }, [frameCount, onLoaded, scrollProgress, drawFrame]);

    // Handle scroll updates via MotionValue event
    useMotionValueEvent(scrollProgress, "change", (latest) => {
        if (isLoaded) {
            drawFrame(latest);
        }
    });

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-50 bg-[#050505]">
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gold transition-all duration-300 ease-out"
                            style={{ width: `${(imagesLoaded / frameCount) * 100}%` }}
                        />
                    </div>
                    <p className="text-white/40 text-xs tracking-[0.2em] font-light uppercase">
                        Loading Craftsmanship {Math.round((imagesLoaded / frameCount) * 100)}%
                    </p>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="max-w-full max-h-full object-contain pointer-events-none"
            />
        </div>
    );
};

export default PerfumeCanvas;
