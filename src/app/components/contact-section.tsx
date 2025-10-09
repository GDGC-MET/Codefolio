"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ContactSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Form submitted:', formData);
            alert('Thank you for your message! I will get back to you soon.');

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 1000);
    };

    const isFormValid = formData.name && formData.email && formData.subject && formData.message;

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

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
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
            id="contact"
            ref={sectionRef}
            className="py-24 px-4 md:px-12"
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16 relative text-white"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                    <motion.span
                        className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.h2>

                <motion.div
                    className="flex flex-col lg:flex-row gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.div className="flex-1" variants={itemVariants}>
                        <motion.h3
                            className="text-3xl font-bold text-white mb-6"
                            variants={itemVariants}
                        >
                            Let's Connect
                        </motion.h3>

                        <motion.p
                            className="text-lg text-gray-300 mb-10 leading-relaxed"
                            variants={itemVariants}
                        >
                            I'm always open to discussing new opportunities, creative ideas, or opportunities to be part of your vision.
                        </motion.p>

                        <motion.div className="space-y-6 mb-10" variants={itemVariants}>
                            <motion.div
                                className="flex items-center gap-5"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/20">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Location</div>
                                    <div className="text-gray-400">Nashik, Maharashtra</div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-center gap-5"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/20">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Email</div>
                                    <div className="text-gray-400">morgantaylor@gmail.com</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="flex gap-4"
                            variants={itemVariants}
                        >
                            {[
                                {
                                    name: "LinkedIn",
                                    url: "https://www.linkedin.com/company/gdg-met/posts/?feedView=all",
                                    icon: (
                                        <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    )
                                },
                                {
                                    name: "GitHub",
                                    url: "https://github.com/GDGC-MET",
                                    icon: (
                                        <path d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.65 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.65 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    )
                                },
                                {
                                    name: "Email",
                                    url: "mailto:morgantaylor@gmail.com",
                                    icon: (
                                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    )
                                },
                                {
                                    name: "Twitter",
                                    url: "https://x.com/gdgc_met",
                                    icon: (
                                        <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83756 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    )
                                }
                            ].map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target={social.name !== "Email" ? "_blank" : undefined}
                                    rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                                    className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/20 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white hover:border-transparent transition-all duration-300"
                                    title={social.name}
                                    aria-label={`${social.name} profile`}
                                    whileHover={{
                                        y: -5,
                                        scale: 1.1
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {social.icon}
                                        {social.name === "LinkedIn" && (
                                            <>
                                                <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </>
                                        )}
                                        {social.name === "Email" && (
                                            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        )}
                                    </svg>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div className="flex-1" variants={itemVariants}>
                        <motion.form
                            onSubmit={handleSubmit}
                            className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
                            variants={itemVariants}
                        >
                            <div className="space-y-6">
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="name" className="block text-white font-medium mb-3">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        aria-required="true"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                        placeholder="Your name"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label htmlFor="email" className="block text-white font-medium mb-3">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        aria-required="true"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                        placeholder="your.email@example.com"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label htmlFor="subject" className="block text-white font-medium mb-3">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        aria-required="true"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                                        placeholder="What's this about?"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label htmlFor="message" className="block text-white font-medium mb-3">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        aria-required="true"
                                        rows={6}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-vertical"
                                        placeholder="Let's collaborate on something amazing!"
                                    />
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                                        isFormValid && !isSubmitting
                                            ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1'
                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                                    variants={itemVariants}
                                    whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                                    whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                                >
                                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                    {isSubmitting ? (
                                        <motion.div
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </motion.button>
                            </div>
                        </motion.form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;