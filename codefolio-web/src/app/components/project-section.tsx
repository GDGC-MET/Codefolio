"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
    id: number;
    title: string;
    description: string;
    icon: string;
    tags: string[];
    liveDemo: string;
    github: string;
    color: string;
}

const ProjectsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const projects: Project[] = [
        {
            id: 1,
            title: "AI Travel Planner",
            description: "Full-stack MERN application with AI-powered itinerary planning, user photo uploads, Razorpay integration, and modern animations. Features mobile-responsive design and real-time travel recommendations.",
            icon: "🌍",
            tags: ["MERN Stack", "AI Integration", "Animations", "Payment Gateway"],
            liveDemo: "https://suyash2527.github.io/Itinno/",
            github: "https://github.com/GDGC-MET",
            color: "from-blue-500 to-green-500"
        },
        {
            id: 2,
            title: "Healthcare AI Assistant",
            description: "AI-powered healthcare application that provides symptom analysis, medication reminders, and telemedicine features. Built with React, Node.js, and integrated with medical APIs for accurate health insights.",
            icon: "🏥",
            tags: ["React", "AI/ML", "Healthcare", "API Integration"],
            liveDemo: "#",
            github: "https://github.com/GDGC-MET",
            color: "from-green-500 to-teal-500"
        },
        {
            id: 3,
            title: "Climate Data Visualizer",
            description: "Interactive web application that visualizes climate change data using D3.js and Chart.js. Features real-time weather APIs, predictive analytics, and responsive design for environmental awareness.",
            icon: "🌱",
            tags: ["Data Visualization", "D3.js", "Climate Tech", "APIs"],
            liveDemo: "#",
            github: "https://github.com/GDGC-MET",
            color: "from-emerald-500 to-cyan-500"
        },
        {
            id: 4,
            title: "Smart Agriculture Platform",
            description: "IoT-based agriculture monitoring system with React frontend and Node.js backend. Includes soil monitoring, weather prediction, and crop recommendation features using machine learning algorithms.",
            icon: "🌾",
            tags: ["IoT", "Machine Learning", "Agriculture", "React"],
            liveDemo: "#",
            github: "https://github.com/GDGC-MET",
            color: "from-amber-500 to-orange-500"
        },
        {
            id: 5,
            title: "E-Learning Platform",
            description: "Comprehensive online learning platform with video streaming, interactive quizzes, progress tracking, and real-time chat. Built using MERN stack with advanced authentication and payment integration.",
            icon: "📚",
            tags: ["MERN Stack", "Video Streaming", "Real-time Chat", "Education"],
            liveDemo: "#",
            github: "https://github.com/GDGC-MET",
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 6,
            title: "Portfolio Website",
            description: "Modern, animated portfolio website built with Next.js, TypeScript, and Framer Motion. Features smooth animations, responsive design, and optimized performance for showcasing development skills.",
            icon: "💼",
            tags: ["Next.js", "TypeScript", "Framer Motion", "Portfolio"],
            liveDemo: "#",
            github: "https://github.com/GDGC-MET",
            color: "from-indigo-500 to-blue-500"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.6
            }
        }
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="py-24 px-4 md:px-12 bg-gray-900/30"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative text-white"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Featured Projects
                    <motion.span
                        className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.h2>

                {/* Projects Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            {/* Project Image/Icon */}
                            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                                {/* Project Icon */}
                                <motion.div
                                    className="text-6xl mb-4"
                                    whileHover={{
                                        scale: 1.2,
                                        rotate: 5,
                                        transition: { type: "spring", stiffness: 400 }
                                    }}
                                >
                                    {project.icon}
                                </motion.div>

                                {/* Overlay with Links */}
                                <motion.div
                                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    <div className="flex gap-4">
                                        <motion.a
                                            href={project.liveDemo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-6 py-3 bg-gradient-to-r ${project.color} text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg`}
                                            aria-label="View live demo"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Live Demo
                                        </motion.a>
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full border border-gray-600 hover:bg-gray-600 transition-all duration-300"
                                            aria-label="View source code"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            GitHub
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <motion.h3
                                    className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300"
                                    layoutId={`title-${project.id}`}
                                >
                                    {project.title}
                                </motion.h3>

                                <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                                    {project.description}
                                </p>

                                {/* Project Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, index) => (
                                        <motion.span
                                            key={tag}
                                            className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{
                                                delay: 0.5 + index * 0.1,
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Gradient Border Effect */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none rounded-2xl`}
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 0.1 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View More Projects Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <motion.a
                        href="https://github.com/GDGC-MET"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                        whileHover={{
                            scale: 1.05,
                            y: -2
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>View All Projects</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;