"use client";
import { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="fixed w-4 h-4 bg-blue-500/60 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                }}
            />

            <motion.div
                className="fixed w-8 h-8 border-2 border-blue-400/40 rounded-full pointer-events-none z-[9998]"
                style={{
                    left: useSpring(cursorX, { damping: 30, stiffness: 200, mass: 0.8 }),
                    top: useSpring(cursorY, { damping: 30, stiffness: 200, mass: 0.8 }),
                    x: '-50%',
                    y: '-50%',
                }}
            />
        </>
    );
};

export default CustomCursor;