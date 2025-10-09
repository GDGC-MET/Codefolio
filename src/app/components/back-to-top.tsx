"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full flex items-center justify-center z-50 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    aria-label="Back to top"
                    initial={{
                        opacity: 0,
                        scale: 0,
                        y: 20
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0,
                        y: 20
                    }}
                    whileHover={{
                        scale: 1.1,
                        y: -5,
                        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 15L12 9L6 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;