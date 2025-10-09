"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface StatData {
    count: number;
    label: string;
}

const AboutSection = () => {
    const [animatedStats, setAnimatedStats] = useState([0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has completed
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const mainControls = useAnimation();

    const statsData: StatData[] = [
        { count: 15, label: "Projects Completed" },
        { count: 3, label: "Years Experience" },
        { count: 10, label: "Technologies" }
    ];

    useEffect(() => {
        if (isInView && !hasAnimated) {
            mainControls.start("visible");
            animateStats();
        }
    }, [isInView, mainControls, hasAnimated]);

    const animateStats = () => {
        if (hasAnimated) return;

        setHasAnimated(true);

        statsData.forEach((stat, index) => {
            let current = 0;
            const increment = stat.count / 60;
            const stepTime = 2000 / 60;

            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.count) {
                    current = stat.count;
                    clearInterval(timer);

                    setAnimatedStats(prev => {
                        const newStats = [...prev];
                        newStats[index] = stat.count;
                        return newStats;
                    });
                } else {
                    setAnimatedStats(prev => {
                        const newStats = [...prev];
                        newStats[index] = Math.floor(current);
                        return newStats;
                    });
                }
            }, stepTime);
        });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const statVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.3
            }
        }
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-24 px-4 md:px-12"
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative text-white"
                    initial={{ opacity: 0, y: -30 }}
                    animate={mainControls}
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                >
                    About Me
                    <motion.span
                        className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={mainControls}
                        variants={{
                            visible: {
                                scaleX: 1,
                                transition: { duration: 0.8, delay: 0.3 }
                            }
                        }}
                    />
                </motion.h2>

                <motion.div
                    className="flex flex-col lg:flex-row items-center gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={mainControls}
                >
                    <motion.div className="flex-1 space-y-6" variants={itemVariants}>
                        <motion.p
                            className="text-lg md:text-xl leading-relaxed text-gray-300"
                            variants={itemVariants}
                        >
                            I'm a passionate Computer Science student from MET BKC IOE, Nashik, with a strong focus on
                            full-stack web development and artificial intelligence applications. My journey in tech has been
                            driven by curiosity and a desire to solve real-world problems through innovative solutions.
                        </motion.p>

                        <motion.p
                            className="text-lg md:text-xl leading-relaxed text-gray-300"
                            variants={itemVariants}
                        >
                            I specialize in the MERN stack and have experience building interactive web applications with
                            advanced animations, AI-powered features, and responsive designs. I'm particularly interested
                            in applying technology to address challenges in climate change, healthcare, and agriculture.
                        </motion.p>

                        <motion.p
                            className="text-lg md:text-xl leading-relaxed text-gray-300"
                            variants={itemVariants}
                        >
                            When I'm not coding, you'll find me exploring new web animation techniques, researching AI
                            applications, or working on personal projects that push the boundaries of what's possible
                            with modern web technologies.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-8 pt-8"
                            variants={itemVariants}
                        >
                            {statsData.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center flex-1"
                                    variants={statVariants}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { type: "spring", stiffness: 300 }
                                    }}
                                >
                                    <motion.div
                                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            delay: index * 0.2 + 0.5
                                        }}
                                    >
                                        {hasAnimated ? (
                                            <>
                                                {animatedStats[index]}
                                                {stat.count === 15 && '+'}
                                            </>
                                        ) : (
                                            <>
                                                {animatedStats[index]}
                                                {stat.count === 15 && animatedStats[index] === 15 && '+'}
                                            </>
                                        )}
                                    </motion.div>
                                    <div className="text-gray-400 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex-1 flex justify-center items-center"
                        variants={itemVariants}
                    >
                        <div className="relative w-80 h-80">
                            <motion.div
                                className="absolute inset-0 rounded-full p-3"
                                style={{
                                    background: 'conic-gradient(from 0deg, #3498db, #2ecc71, #3498db)'
                                }}
                                animate={{
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                            >
                                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center relative">
                                    <motion.div
                                        className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.5,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { type: "spring", stiffness: 400 }
                                        }}
                                    >
                                        MT
                                    </motion.div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-30 -z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.4, 0.2]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
