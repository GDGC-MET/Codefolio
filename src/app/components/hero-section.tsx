"use client";
import React, { useEffect, useState } from 'react';

const HeroSection = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const titles = [
        "Full-Stack Developer & AI Enthusiast",
        "MERN Stack Specialist",
        "Problem Solver",
        "Tech Innovator"
    ];

    useEffect(() => {
        const currentTitle = titles[currentIndex];
        let timeout: NodeJS.Timeout;

        if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText(currentTitle.substring(0, displayText.length - 1));
            }, 50);

            if (displayText === '') {
                setIsDeleting(false);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
            }
        } else {
            timeout = setTimeout(() => {
                setDisplayText(currentTitle.substring(0, displayText.length + 1));
            }, 100);

            if (displayText === currentTitle) {
                setTimeout(() => setIsDeleting(true), 2000);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, isDeleting, titles]);

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
        <section
            id="home"
            className="min-h-screen flex items-center justify-center px-4 md:px-12 relative overflow-hidden"
        >
            <div id="particles-js" className="absolute inset-0 z-10"></div>

            <div className="flex items-center justify-between max-w-7xl w-full gap-12 lg:gap-20">
                <div className="flex-1 z-10 opacity-0 translate-y-12 animate-[fadeInUp_1s_ease-out_forwards]">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                        <span className="block">
                            Hi, I'm{' '}
                            <span className="relative bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                                Morgan Taylor
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform scale-x-0 origin-left animate-[expandWidth_1.5s_ease_forwards_0.5s]"></span>
                            </span>
                        </span>
                    </h1>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-blue-500 mb-6 font-semibold min-h-[3rem]">
                        {displayText}
                        <span className="inline-block w-0.5 h-8 bg-blue-500 ml-1 animate-pulse"></span>
                    </h2>

                    <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-400 max-w-2xl">
                        Computer Science student passionate about creating innovative web solutions using MERN stack,
                        AI applications for climate change, healthcare, and agriculture. I love building interactive
                        experiences with modern animations and cutting-edge technology.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 flex-wrap">
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40"
                            aria-label="View my projects"
                        >
                            <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-[3] transition-transform duration-600 origin-center"></span>
                            <span className="relative z-10">View My Work</span>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="relative z-100 group-hover:translate-x-1 transition-transform duration-300"
                            >
                                <path
                                    d="M5 12H19M19 12L12 5M19 12L12 19"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-blue-500 text-blue-500 font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-blue-500/40"
                            aria-label="Get in touch"
                        >
                            <span>Get In Touch</span>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="group-hover:translate-x-1 transition-transform duration-300"
                            >
                                <path
                                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M22 6L12 13L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 relative h-96 hidden lg:block">
                    <div className="relative w-full h-full">
                        <div
                            className="absolute w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-70 blur-xl top-[20%] left-[10%] animate-[float_6s_ease-in-out_infinite]"
                            style={{ animationDelay: '0s' }}
                        ></div>
                        <div
                            className="absolute w-36 h-36 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-70 blur-xl top-[50%] right-[10%] animate-[float_6s_ease-in-out_infinite]"
                            style={{ animationDelay: '2s' }}
                        ></div>
                        <div
                            className="absolute w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-70 blur-xl bottom-[20%] left-[30%] animate-[float_6s_ease-in-out_infinite]"
                            style={{ animationDelay: '4s' }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 text-gray-400 text-sm opacity-0 animate-[fadeIn_1s_ease_forwards_1.5s]">
                <span>Scroll to explore</span>
                <div className="relative w-0.5 h-8 bg-blue-500">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 border-r-2 border-b-2 border-blue-500 rotate-45 animate-[bounce_2s_infinite]"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;