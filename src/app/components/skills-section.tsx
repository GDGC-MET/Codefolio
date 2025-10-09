"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    tags: string[];
    level: number;
    color: string;
}

const SkillsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

    const skills: Skill[] = [
        {
            id: 1,
            title: "Full Stack Development",
            description: "Creating responsive, interactive user interfaces with modern web technologies and advanced animations.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            tags: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "MERN Stack"],
            level: 90,
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            title: "AI & Machine Learning",
            description: "Developing intelligent applications using modern AI frameworks and machine learning algorithms.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M466.582,444.603V149.967h-81.474c0.033-1.586,0.055-3.17,0.055-4.753c0-39.593-10.268-73.984-29.693-99.455
                C332.641,15.823,298.244,0,256,0s-76.641,15.823-99.472,45.759c-19.425,25.471-29.693,59.862-29.693,99.455
                c0,1.583,0.021,3.167,0.055,4.753H45.418v294.636h166.833v34.006H169.8V512H342.2v-33.391h-42.45v-34.006H466.582z
                M382.003,183.358h51.188V351.49H313.253V308.31C348.96,282.645,373.62,234.405,382.003,183.358z M272.696,34.488
                c8.46,1.158,16.294,3.231,23.481,6.216l-12.758,33.972l-10.723,4.643V34.488z M272.696,267.817h18.509v-33.391h-18.509V115.704
                l36.999-16.016l14.693-39.125c1.571,1.734,3.084,3.546,4.532,5.445c1.282,1.681,2.494,3.452,3.675,5.261l-16.096,42.86
                l31.26,11.739l2.193-5.838c1.19,8.055,1.821,16.475,1.821,25.183c0,36.303-10.701,75.03-28.624,103.595
                c-17.119,27.282-35.784,38.489-50.453,42.805V267.817z M279.861,324.374v27.117H232.14v-27.117
                c7.643,2.028,15.606,3.113,23.86,3.113S272.217,326.403,279.861,324.374z M239.304,34.488v44.831l-10.723-4.641l-12.758-33.973
                C223.012,37.719,230.844,35.644,239.304,34.488z M162.049,120.033l2.193,5.838l31.26-11.739l-16.096-42.86
                c1.181-1.811,2.393-3.581,3.675-5.261c1.448-1.899,2.962-3.711,4.533-5.445l14.693,39.125l36.996,16.014v118.723h-18.509v33.391
                h18.509v23.798c-14.668-4.316-33.335-15.524-50.453-42.805c-17.923-28.566-28.624-67.292-28.624-103.595
                C160.228,136.508,160.859,128.088,162.049,120.033z M78.809,183.358h51.188c8.383,51.046,33.043,99.287,68.75,124.951v43.181
                H78.809V183.358z M266.358,478.609h-20.716v-34.006h20.716V478.609z M78.809,411.212v-26.33h354.383v26.33H78.809z"
                          fill="currentColor"/>
                    <path d="M256,387.689c-4.868,0-8.807,3.893-8.807,8.703c0,4.81,3.939,8.703,8.807,8.703c4.867,0,8.807-3.893,8.807-8.703
                C264.807,391.582,260.867,387.689,256,387.689z"
                          fill="currentColor"/>
                    <circle cx="309.66" cy="164.719" r="22.804" fill="currentColor"/>
                    <circle cx="202.329" cy="164.719" r="22.804" fill="currentColor"/>
                </svg>
            ),
            tags: ["Python", "TensorFlow", "OpenAI API", "Data Science", "Neural Networks", "Computer Vision"],
            level: 85,
            color: "from-green-500 to-emerald-500"
        },
        {
            id: 3,
            title: "Backend Development",
            description: "Building scalable server-side applications with robust APIs and database management systems.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23" cy="23" r="1" fill="currentColor"/>
                    <rect x="8" y="22" width="12" height="2" fill="currentColor"/>
                    <circle cx="23" cy="9" r="1" fill="currentColor"/>
                    <rect x="8" y="8" width="12" height="2" fill="currentColor"/>
                    <path d="M26,14a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2H6A2,2,0,0,0,4,6v6a2,2,0,0,0,2,2H8v4H6a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V20a2,2,0,0,0-2-2H24V14ZM6,6H26v6H6ZM26,26H6V20H26Zm-4-8H10V14H22Z" fill="currentColor"/>
                </svg>
            ),
            tags: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"],
            level: 88,
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 4,
            title: "Cloud & DevOps",
            description: "Deploying and managing applications using modern cloud platforms and DevOps practices.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21V11M12 11L9 14M12 11L15 14M7 16.8184C4.69636 16.2074 3 14.1246 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.8148 19.25 16.7236 17 16.9725" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            tags: ["AWS", "Docker", "Git", "CI/CD", "Vercel", "Railway"],
            level: 75,
            color: "from-orange-500 to-red-500"
        },
        {
            id: 5,
            title: "Mobile Development",
            description: "Creating cross-platform mobile applications with native performance and modern UI/UX design.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="18" x2="12" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            ),
            tags: ["React Native", "Flutter", "iOS", "Android", "Expo", "Firebase"],
            level: 80,
            color: "from-indigo-500 to-blue-500"
        },
        {
            id: 6,
            title: "UI/UX Design",
            description: "Designing intuitive user interfaces and experiences with modern design principles and tools.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle fill="currentColor" opacity="0.1" cx="256" cy="256" r="256"/>
                    <rect x="168" y="456" fill="currentColor" opacity="0.3" width="176" height="8"/>
                    <polygon fill="currentColor" opacity="0.4" points="312,456 200,456 208,400 304,400"/>
                    <path fill="currentColor" opacity="0.3" d="M448,360v32c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8v-32H448z"/>
                    <rect x="80" y="120" fill="currentColor" opacity="0.9" width="352" height="224"/>
                    <path fill="currentColor" d="M440,104H72c-4.4,0-8,3.6-8,8v248h384V112C448,107.6,444.4,104,440,104z M432,344H80V120h352V344z"/>
                    <rect x="80" y="120" fill="currentColor" opacity="0.1" width="352" height="224"/>
                    <rect x="136" y="144" fill="currentColor" opacity="0.3" width="240" height="96"/>
                    <rect x="264" y="264" fill="currentColor" opacity="0.3" width="112" height="8"/>
                    <rect x="264" y="288" fill="currentColor" opacity="0.3" width="112" height="8"/>
                    <rect x="264" y="312" fill="currentColor" opacity="0.3" width="112" height="8"/>
                    <rect x="136" y="264" fill="currentColor" opacity="0.3" width="104" height="56"/>
                </svg>
            ),
            tags: ["Figma", "Adobe XD", "Tailwind CSS", "Framer Motion", "Responsive Design", "Prototyping"],
            level: 82,
            color: "from-pink-500 to-rose-500"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.8
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
            id="skills"
            ref={sectionRef}
            className="py-24 px-4 md:px-12 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-50" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative text-white"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Technical Skills
                    <motion.span
                        className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.id}
                            className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
                            variants={cardVariants}
                            onHoverStart={() => setHoveredSkill(skill.id)}
                            onHoverEnd={() => setHoveredSkill(null)}
                            whileHover={{
                                y: -15,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredSkill === skill.id ? 0.1 : 0 }}
                            />

                            <motion.div
                                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.color}`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isInView ? 1 : 0 }}
                                transition={{ delay: skill.id * 0.2, duration: 0.8 }}
                            />

                            <motion.div
                                className={`w-20 h-20 bg-gradient-to-br ${skill.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:text-white transition-colors duration-300`}
                                whileHover={{
                                    rotate: 5,
                                    scale: 1.1,
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                            >
                                {skill.icon}
                            </motion.div>

                            <motion.h3
                                className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300"
                                layoutId={`skill-title-${skill.id}`}
                            >
                                {skill.title}
                            </motion.h3>

                            <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                                {skill.description}
                            </p>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-400">Proficiency</span>
                                    <span className="text-sm font-semibold text-blue-400">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={{ width: isInView ? `${skill.level}%` : 0 }}
                                        transition={{
                                            delay: skill.id * 0.3 + 0.5,
                                            duration: 1.5,
                                            ease: "easeOut"
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {skill.tags.map((tag, index) => (
                                    <motion.span
                                        key={tag}
                                        className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{
                                            delay: skill.id * 0.2 + index * 0.1 + 0.8,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: "rgba(59, 130, 246, 0.3)"
                                        }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>

                            {hoveredSkill === skill.id && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`absolute w-2 h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                                            style={{
                                                left: `${20 + i * 15}%`,
                                                top: `${20 + (i % 2) * 40}%`,
                                            }}
                                            animate={{
                                                y: [-10, 10, -10],
                                                opacity: [0.3, 1, 0.3],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl border border-blue-500/20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            ⚡
                        </motion.div>
                        <span className="text-gray-300 font-medium">
                            Always learning new technologies and staying updated with industry trends
                        </span>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                            🚀
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;