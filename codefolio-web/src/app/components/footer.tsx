"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <footer className="bg-gray-900/50 border-t border-gray-700/50 py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                    <motion.div
                        className="footer-logo"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="flex items-center text-2xl font-bold cursor-pointer mb-4"
                            onClick={() => scrollToSection('home')}
                            whileHover={{ scale: 1.05 }}
                            aria-label="Home"
                        >
                            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                                Morgan Taylor
                            </span>
                            <span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
                        </motion.div>
                        <p className="text-gray-400">Full-Stack Developer & AI Enthusiast</p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {[
                            { name: "Home", id: "home" },
                            { name: "About", id: "about" },
                            { name: "Skills", id: "skills" },
                            { name: "Projects", id: "projects" },
                            { name: "Contact", id: "contact" }
                        ].map((link, index) => (
                            <motion.button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="text-gray-400 hover:text-blue-400 transition-all duration-300 font-medium"
                                whileHover={{
                                    y: -2,
                                    color: "#3b82f6"
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.3 + index * 0.1
                                }}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="border-t border-gray-700/50 pt-8 text-center space-y-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-gray-400 text-sm">
                        &copy; 2025 Morgan Taylor. Crafted with passion for innovation.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Computer Science Student | Full-Stack Developer | AI Enthusiast
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;